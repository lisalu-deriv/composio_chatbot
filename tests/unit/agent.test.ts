import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { createReActAgent, convertToLangChainMessages } from '@/lib/ai/agent';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import type { PostRequestBody } from '@/app/(chat)/api/chat/schema';

/**
 * Unit tests for agent functionality
 * Following Google TypeScript style guidelines
 */

// Mock dependencies
const mockModel = {
  invoke: async (messages: any[]) => {
    return new AIMessage({
      content: 'Mock response from agent',
    });
  },
  bindTools: function(tools: any[]) {
    return this;
  },
};

const mockCreateModelById = (modelId: string, options?: any) => {
  return mockModel;
};

// Mock the providers module
const originalCreateModelById = require('@/lib/ai/providers').createModelById;

describe('Agent Unit Tests', () => {
  beforeEach(() => {
    // Mock createModelById
    require('@/lib/ai/providers').createModelById = mockCreateModelById;
  });

  afterEach(() => {
    // Restore original function
    require('@/lib/ai/providers').createModelById = originalCreateModelById;
  });

  describe('Message Conversion', () => {
    it('should convert UI messages to LangChain format correctly', () => {
      const uiMessages = [
        {
          id: '1',
          role: 'user' as const,
          content: 'Hello',
          parts: [{ type: 'text' as const, text: 'Hello' }],
        },
        {
          id: '2',
          role: 'assistant' as const,
          content: 'Hi there!',
          parts: [{ type: 'text' as const, text: 'Hi there!' }],
        },
      ];

      const langchainMessages = convertToLangChainMessages(uiMessages);

      assert.strictEqual(langchainMessages.length, 2);
      assert.ok(langchainMessages[0] instanceof HumanMessage);
      assert.ok(langchainMessages[1] instanceof AIMessage);
      assert.strictEqual(langchainMessages[0].content, 'Hello');
      assert.strictEqual(langchainMessages[1].content, 'Hi there!');
    });

    it('should handle empty content gracefully', () => {
      const uiMessages = [
        {
          id: '1',
          role: 'user' as const,
          content: '',
          parts: [{ type: 'text' as const, text: 'Fallback text' }],
        },
      ];

      const langchainMessages = convertToLangChainMessages(uiMessages);

      assert.strictEqual(langchainMessages[0].content, 'Fallback text');
    });

    it('should handle missing parts array', () => {
      const uiMessages = [
        {
          id: '1',
          role: 'user' as const,
          content: 'Direct content',
        },
      ];

      const langchainMessages = convertToLangChainMessages(uiMessages);

      assert.strictEqual(langchainMessages[0].content, 'Direct content');
    });
  });

  describe('ReActAgent Creation', () => {
    it('should create agent with correct configuration', () => {
      const config = {
        modelId: 'gpt-5-mini',
        maxSteps: 5,
        temperature: 0.7,
        tools: [],
      };

      const agent = createReActAgent(config);

      assert.ok(agent !== undefined);
      expect(agent.getTools()).toEqual([]);
    });

    it('should handle tools binding correctly', () => {
      const mockTool = {
        name: 'test_tool',
        description: 'Test tool',
        parameters: { type: 'object', properties: {} },
        function: () => 'test result',
      };

      const config = {
        modelId: 'gpt-5-mini',
        tools: [mockTool],
      };

      const agent = createReActAgent(config);

      expect(agent.getTools()).toHaveLength(1);
      expect(agent.getTools()[0]).toBe(mockTool);
    });

    it('should handle configuration updates', () => {
      const agent = createReActAgent({
        modelId: 'gpt-5-mini',
        tools: [],
      });

      agent.updateConfig({
        modelId: 'claude-4-sonnet',
        temperature: 0.5,
      });

      // Agent should be updated (we can't directly test internal state,
      // but we can verify it doesn't throw)
      assert.ok(agent !== undefined);
    });
  });

  describe('Agent Invocation', () => {
    it('should invoke agent and return response', async () => {
      const agent = createReActAgent({
        modelId: 'gpt-5-mini',
        tools: [],
      });

      const messages = [new HumanMessage({ content: 'Test message' })];
      const result = await agent.invoke(messages);

      expect(Array.isArray(result)).toBe(true);
      assert.ok(result.length > 0);
    });

    it('should handle empty messages array', async () => {
      const agent = createReActAgent({
        modelId: 'gpt-5-mini',
        tools: [],
      });

      const result = await agent.invoke([]);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('Request Body Validation', () => {
    it('should validate correct request body structure', () => {
      const validBody: PostRequestBody = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          createdAt: new Date(),
          role: 'user',
          content: 'Hello, how are you?',
          parts: [{ type: 'text', text: 'Hello, how are you?' }],
        },
        selectedChatModel: 'gpt-5-mini',
        selectedVisibilityType: 'private',
        enabledToolkits: [],
      };

      // Basic structure validation
      assert.ok(validBody.id !== undefined);
      assert.ok(validBody.message !== undefined);
      assert.strictEqual(validBody.message.role, 'user');
      assert.ok(validBody.selectedChatModel !== undefined);
      assert.ok(validBody.selectedVisibilityType !== undefined);
    });

    it('should handle optional fields correctly', () => {
      const bodyWithOptionals: PostRequestBody = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          createdAt: new Date(),
          role: 'user',
          content: 'Hello',
          parts: [{ type: 'text', text: 'Hello' }],
          experimental_attachments: [
            {
              url: 'https://example.com/image.png',
              name: 'image.png',
              contentType: 'image/png',
            },
          ],
        },
        selectedChatModel: 'gpt-5-mini',
        selectedVisibilityType: 'public',
        enabledToolkits: [
          {
            slug: 'github',
            isConnected: true,
          },
        ],
      };

      assert.ok(bodyWithOptionals.message.experimental_attachments !== undefined);
      assert.ok(bodyWithOptionals.enabledToolkits !== undefined);
      assert.strictEqual(bodyWithOptionals.enabledToolkits?.length, 1);
    });
  });

  describe('Streaming Response Format', () => {
    it('should format text delta correctly', () => {
      const textDelta = 'Hello world';
      const data = {
        type: 'text-delta',
        textDelta,
      };

      const encoder = new TextEncoder();
      const formatted = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
      const decoded = new TextDecoder().decode(formatted);

      assert.strictEqual(decoded, 'data: {"type":"text-delta","textDelta":"Hello world"}\n\n');
    });

    it('should format finish message correctly', () => {
      const finishData = {
        type: 'finish',
        message: {
          id: 'test-id',
          role: 'assistant',
          content: 'Complete response',
          createdAt: new Date('2024-01-01'),
        },
      };

      const encoder = new TextEncoder();
      const formatted = encoder.encode(`data: ${JSON.stringify(finishData)}\n\n`);
      const decoded = new TextDecoder().decode(formatted);

      assert.ok(decoded.includes('"type":"finish"'));
      assert.ok(decoded.includes('"content":"Complete response"'));
      assert.ok(decoded.includes('"role":"assistant"'));
    });

    it('should format error message correctly', () => {
      const errorData = {
        type: 'error',
        error: 'Something went wrong',
      };

      const encoder = new TextEncoder();
      const formatted = encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`);
      const decoded = new TextDecoder().decode(formatted);

      assert.ok(decoded.includes('"type":"error"'));
      assert.ok(decoded.includes('"error":"Something went wrong"'));
    });
  });

  describe('Error Handling', () => {
    it('should handle agent creation errors', () => {
      // Mock createModelById to throw an error
      require('@/lib/ai/providers').createModelById = () => {
        throw new Error('Model not found');
      };

      expect(() => {
        createReActAgent({ modelId: 'invalid-model' });
      }).toThrow('Model not found');
    });

    it('should handle invalid tool configurations', () => {
      const invalidTool = {
        // Missing required fields
        name: 'invalid_tool',
      };

      const config = {
        modelId: 'gpt-5-mini',
        tools: [invalidTool],
      };

      // Should not throw, but handle gracefully
      const agent = createReActAgent(config);
      assert.ok(agent !== undefined);
    });
  });

  describe('Tool Integration', () => {
    it('should handle tools with proper schema', () => {
      const weatherTool = {
        name: 'get_weather',
        description: 'Get weather information for a location',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The location to get weather for',
            },
          },
          required: ['location'],
        },
        function: (args: { location: string }) => {
          return `Weather in ${args.location}: Sunny, 25°C`;
        },
      };

      const agent = createReActAgent({
        modelId: 'gpt-5-mini',
        tools: [weatherTool],
      });

      expect(agent.getTools()).toHaveLength(1);
      expect(agent.getTools()[0].name).toBe('get_weather');
    });

    it('should handle multiple tools', () => {
      const tools = [
        {
          name: 'tool1',
          description: 'First tool',
          parameters: { type: 'object', properties: {} },
          function: () => 'result1',
        },
        {
          name: 'tool2',
          description: 'Second tool',
          parameters: { type: 'object', properties: {} },
          function: () => 'result2',
        },
      ];

      const agent = createReActAgent({
        modelId: 'gpt-5-mini',
        tools,
      });

      expect(agent.getTools()).toHaveLength(2);
      expect(agent.getTools().map(t => t.name)).toEqual(['tool1', 'tool2']);
    });
  });

  describe('Configuration Management', () => {
    it('should handle temperature settings', () => {
      const agent = createReActAgent({
        modelId: 'gpt-5-mini',
        temperature: 0.8,
        tools: [],
      });

      assert.ok(agent !== undefined);

      // Update temperature
      agent.updateConfig({ temperature: 0.2 });
      assert.ok(agent !== undefined);
    });

    it('should handle max steps configuration', () => {
      const agent = createReActAgent({
        modelId: 'gpt-5-mini',
        maxSteps: 10,
        tools: [],
      });

      assert.ok(agent !== undefined);

      // Update max steps
      agent.updateConfig({ maxSteps: 3 });
      assert.ok(agent !== undefined);
    });

    it('should handle request hints', () => {
      const requestHints = {
        longitude: '-74.0060',
        latitude: '40.7128',
        city: 'New York',
        country: 'US',
      };

      const agent = createReActAgent({
        modelId: 'gpt-5-mini',
        requestHints,
        tools: [],
      });

      assert.ok(agent !== undefined);
    });
  });
});

/**
 * Performance and stress tests
 */
describe('Agent Performance Tests', () => {
  it('should handle large message arrays efficiently', () => {
    const largeMessageArray = Array.from({ length: 100 }, (_, i) => ({
      id: `msg-${i}`,
      role: i % 2 === 0 ? 'user' : 'assistant' as const,
      content: `Message ${i}`,
      parts: [{ type: 'text' as const, text: `Message ${i}` }],
    }));

    const startTime = Date.now();
    const langchainMessages = convertToLangChainMessages(largeMessageArray);
    const endTime = Date.now();

    assert.strictEqual(langchainMessages.length, 100);
    assert.ok(endTime - startTime < 100); // Should complete quickly
  });

  it('should handle agent creation efficiently', () => {
    const startTime = Date.now();
    
    for (let i = 0; i < 10; i++) {
      const agent = createReActAgent({
        modelId: 'gpt-5-mini',
        tools: [],
      });
      assert.ok(agent !== undefined);
    }
    
    const endTime = Date.now();
    assert.ok(endTime - startTime < 1000); // Should create 10 agents quickly
  });
});
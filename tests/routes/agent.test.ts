import { test, expect, type APIRequestContext } from '@playwright/test';
import type { PostRequestBody } from '@/app/(chat)/api/chat/schema';

/**
 * Test suite for agent functionality and chat API route
 * Following Google TypeScript style guidelines
 */
test.describe('Agent API Route Tests', () => {
  let request: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
      baseURL: 'http://localhost:3000',
    });
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  test.describe('Chat API Endpoint', () => {
    test('should handle valid chat request and return streaming response', async () => {
      const requestBody: PostRequestBody = {
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

      const response = await request.post('/api/chat', {
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Should return streaming response
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toBe('text/event-stream');
      
      // Check if response body contains streaming data
      const responseText = await response.text();
      console.log('Response received:', responseText.substring(0, 200));
      
      // Should contain data events
      expect(responseText).toContain('data:');
    });

    test('should handle invalid request body', async () => {
      const invalidBody = {
        id: 'invalid-uuid',
        message: 'not an object',
      };

      const response = await request.post('/api/chat', {
        data: invalidBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status()).toBe(400);
    });

    test('should handle missing authentication', async () => {
      const requestBody: PostRequestBody = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          createdAt: new Date(),
          role: 'user',
          content: 'Hello',
          parts: [{ type: 'text', text: 'Hello' }],
        },
        selectedChatModel: 'gpt-5-mini',
        selectedVisibilityType: 'private',
      };

      // Create new context without authentication
      const unauthenticatedRequest = await request.newContext();
      
      const response = await unauthenticatedRequest.post('/api/chat', {
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status()).toBe(401);
      await unauthenticatedRequest.dispose();
    });
  });

  test.describe('Streaming Response Format', () => {
    test('should validate streaming data format', async () => {
      const requestBody: PostRequestBody = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          createdAt: new Date(),
          role: 'user',
          content: 'What is 2+2?',
          parts: [{ type: 'text', text: 'What is 2+2?' }],
        },
        selectedChatModel: 'gpt-5-mini',
        selectedVisibilityType: 'private',
        enabledToolkits: [],
      };

      const response = await request.post('/api/chat', {
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status()).toBe(200);
      
      const responseText = await response.text();
      console.log('Full streaming response:', responseText);
      
      // Parse streaming events
      const events = responseText
        .split('\n\n')
        .filter(line => line.startsWith('data: '))
        .map(line => {
          try {
            return JSON.parse(line.replace('data: ', ''));
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      console.log('Parsed events:', events);

      // Should have at least one event
      expect(events.length).toBeGreaterThan(0);

      // Check for expected event types
      const eventTypes = events.map(event => event.type);
      console.log('Event types:', eventTypes);

      // Should have either text-delta or finish events
      const hasTextDelta = eventTypes.includes('text-delta');
      const hasFinish = eventTypes.includes('finish');
      
      expect(hasTextDelta || hasFinish).toBe(true);

      // If there's a finish event, it should have the correct structure
      const finishEvent = events.find(event => event.type === 'finish');
      if (finishEvent) {
        expect(finishEvent.message).toBeDefined();
        expect(finishEvent.message.role).toBe('assistant');
        expect(finishEvent.message.content).toBeDefined();
        expect(typeof finishEvent.message.content).toBe('string');
        expect(finishEvent.message.content.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Agent Response Quality', () => {
    test('should generate meaningful response to simple question', async () => {
      const requestBody: PostRequestBody = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          createdAt: new Date(),
          role: 'user',
          content: 'What is the capital of France?',
          parts: [{ type: 'text', text: 'What is the capital of France?' }],
        },
        selectedChatModel: 'gpt-5-mini',
        selectedVisibilityType: 'private',
        enabledToolkits: [],
      };

      const response = await request.post('/api/chat', {
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status()).toBe(200);
      
      const responseText = await response.text();
      
      // Parse the final response
      const events = responseText
        .split('\n\n')
        .filter(line => line.startsWith('data: '))
        .map(line => {
          try {
            return JSON.parse(line.replace('data: ', ''));
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      const finishEvent = events.find(event => event.type === 'finish');
      
      if (finishEvent) {
        const content = finishEvent.message.content.toLowerCase();
        console.log('Agent response:', content);
        
        // Should mention Paris in the response
        expect(content).toContain('paris');
      } else {
        // If no finish event, check text-delta events
        const textDeltas = events
          .filter(event => event.type === 'text-delta')
          .map(event => event.textDelta)
          .join('');
        
        console.log('Combined text deltas:', textDeltas);
        expect(textDeltas.length).toBeGreaterThan(0);
      }
    });

    test('should handle mathematical questions', async () => {
      const requestBody: PostRequestBody = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          createdAt: new Date(),
          role: 'user',
          content: 'Calculate 15 * 23',
          parts: [{ type: 'text', text: 'Calculate 15 * 23' }],
        },
        selectedChatModel: 'gpt-5-mini',
        selectedVisibilityType: 'private',
        enabledToolkits: [],
      };

      const response = await request.post('/api/chat', {
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status()).toBe(200);
      
      const responseText = await response.text();
      console.log('Math response:', responseText);
      
      // Should contain the answer 345
      expect(responseText).toContain('345');
    });
  });

  test.describe('Error Handling', () => {
    test('should handle malformed JSON', async () => {
      const response = await request.post('/api/chat', {
        data: 'invalid json',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status()).toBe(400);
    });

    test('should handle missing required fields', async () => {
      const incompleteBody = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        // Missing message field
        selectedChatModel: 'gpt-5-mini',
        selectedVisibilityType: 'private',
      };

      const response = await request.post('/api/chat', {
        data: incompleteBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(response.status()).toBe(400);
    });

    test('should handle invalid model ID', async () => {
      const requestBody: PostRequestBody = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          createdAt: new Date(),
          role: 'user',
          content: 'Hello',
          parts: [{ type: 'text', text: 'Hello' }],
        },
        selectedChatModel: 'invalid-model-id' as any,
        selectedVisibilityType: 'private',
      };

      const response = await request.post('/api/chat', {
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Should either reject the invalid model or handle gracefully
      expect([400, 500]).toContain(response.status());
    });
  });

  test.describe('Performance Tests', () => {
    test('should respond within reasonable time', async () => {
      const startTime = Date.now();
      
      const requestBody: PostRequestBody = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        message: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          createdAt: new Date(),
          role: 'user',
          content: 'Hello',
          parts: [{ type: 'text', text: 'Hello' }],
        },
        selectedChatModel: 'gpt-5-mini',
        selectedVisibilityType: 'private',
        enabledToolkits: [],
      };

      const response = await request.post('/api/chat', {
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      });

      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log(`Request completed in ${duration}ms`);
      
      expect(response.status()).toBe(200);
      expect(duration).toBeLessThan(30000); // Should complete within 30 seconds
    });
  });
});

/**
 * Integration tests that require authentication
 */
test.describe('Authenticated Agent Tests', () => {
  test('should work with authenticated user', async ({ page }) => {
    // This test would require setting up authentication
    // For now, we'll skip it or implement it when auth is properly set up
    test.skip('Authentication setup needed');
  });
});
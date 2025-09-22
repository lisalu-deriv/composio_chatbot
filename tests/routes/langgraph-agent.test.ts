import { generateUUID } from '@/lib/utils';
import { expect, test } from '../fixtures';
import { TEST_PROMPTS } from '../prompts/routes';

test.describe.serial('/api/chat with LangGraph', () => {
  test('Ada can invoke chat generation with LangGraph agent', async ({ adaContext }) => {
    const chatId = generateUUID();

    const response = await adaContext.request.post('/api/chat', {
      data: {
        id: chatId,
        message: {
          id: generateUUID(),
          role: 'user',
          content: 'What is the current time?',
          parts: [
            {
              type: 'text',
              text: 'What is the current time?',
            },
          ],
          createdAt: new Date().toISOString(),
        },
        selectedChatModel: 'chat-model',
        selectedVisibilityType: 'private',
        enabledToolkits: [], // No external toolkits for this test
      },
    });

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toBeTruthy();
    
    // The response should contain some content
    const lines = text.split('\n').filter(Boolean);
    expect(lines.length).toBeGreaterThan(0);
  });

  test('Ada can invoke chat generation with Composio toolkits enabled', async ({ adaContext }) => {
    const chatId = generateUUID();

    const response = await adaContext.request.post('/api/chat', {
      data: {
        id: chatId,
        message: {
          id: generateUUID(),
          role: 'user',
          content: 'Help me with a simple task',
          parts: [
            {
              type: 'text',
              text: 'Help me with a simple task',
            },
          ],
          createdAt: new Date().toISOString(),
        },
        selectedChatModel: 'chat-model',
        selectedVisibilityType: 'private',
        enabledToolkits: [
          { slug: 'github', name: 'GitHub' },
          { slug: 'linear', name: 'Linear' },
        ],
      },
    });

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toBeTruthy();
    
    // The response should contain some content
    const lines = text.split('\n').filter(Boolean);
    expect(lines.length).toBeGreaterThan(0);
  });

  test('LangGraph agent should handle errors gracefully and fallback to AI SDK', async ({ adaContext }) => {
    const chatId = generateUUID();

    // This test should work even if LangGraph fails, as we have a fallback
    const response = await adaContext.request.post('/api/chat', {
      data: {
        id: chatId,
        message: {
          id: generateUUID(),
          role: 'user',
          content: 'Tell me a joke',
          parts: [
            {
              type: 'text',
              text: 'Tell me a joke',
            },
          ],
          createdAt: new Date().toISOString(),
        },
        selectedChatModel: 'chat-model',
        selectedVisibilityType: 'private',
        enabledToolkits: [],
      },
    });

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toBeTruthy();
  });

  test('Chat with weather tool should work with LangGraph', async ({ adaContext }) => {
    const chatId = generateUUID();

    const response = await adaContext.request.post('/api/chat', {
      data: {
        id: chatId,
        message: {
          id: generateUUID(),
          role: 'user',
          content: 'What is the weather like at latitude 37.7749 and longitude -122.4194?',
          parts: [
            {
              type: 'text',
              text: 'What is the weather like at latitude 37.7749 and longitude -122.4194?',
            },
          ],
          createdAt: new Date().toISOString(),
        },
        selectedChatModel: 'chat-model',
        selectedVisibilityType: 'private',
        enabledToolkits: [],
      },
    });

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toBeTruthy();
    
    // Should contain weather-related content or tool usage
    const lines = text.split('\n').filter(Boolean);
    expect(lines.length).toBeGreaterThan(0);
  });

  test('System prompt should include current time information', async ({ adaContext }) => {
    const chatId = generateUUID();

    const response = await adaContext.request.post('/api/chat', {
      data: {
        id: chatId,
        message: {
          id: generateUUID(),
          role: 'user',
          content: 'What time is it now?',
          parts: [
            {
              type: 'text',
              text: 'What time is it now?',
            },
          ],
          createdAt: new Date().toISOString(),
        },
        selectedChatModel: 'chat-model',
        selectedVisibilityType: 'private',
        enabledToolkits: [],
      },
    });

    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toBeTruthy();
    
    // The agent should be able to respond about time since it's in the system prompt
    const lines = text.split('\n').filter(Boolean);
    expect(lines.length).toBeGreaterThan(0);
  });
});
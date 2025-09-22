import { test, expect } from '@playwright/test';

test.describe('LangGraph Integration Unit Tests', () => {
  test('Chat API endpoint should be accessible', async ({ request }) => {
    // Test the chat API endpoint directly
    const response = await request.post('/api/chat', {
      data: {
        id: 'test-chat-id',
        message: 'Hello, can you tell me what time it is?',
        selectedChatModel: 'gpt-4o',
        selectedVisibilityType: 'private',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Should return a valid response (200 for success, 302 for redirect, 401 for auth)
    expect([200, 302, 401]).toContain(response.status());
  });

  test('Chat API should handle requests', async ({ request }) => {
    // Test that the endpoint exists and handles requests
    const response = await request.post('/api/chat', {
      data: {},
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Should return a valid HTTP status code
    expect([200, 302, 400, 401]).toContain(response.status());
  });

  test('Ping endpoint should work', async ({ request }) => {
    const response = await request.get('/ping');
    expect(response.status()).toBe(200);
    
    const text = await response.text();
    expect(text).toEqual('pong');
  });
});
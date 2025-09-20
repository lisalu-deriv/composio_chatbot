// Mock models for testing - simplified without AI SDK dependencies
export const chatModel = {
  name: 'mock-chat-model',
  invoke: async () => ({
    content: 'Hello, world!',
    role: 'assistant',
  }),
};

export const reasoningModel = {
  name: 'mock-reasoning-model',
  invoke: async () => ({
    content: 'Hello, world!',
    role: 'assistant',
  }),
};

export const titleModel = {
  name: 'mock-title-model',
  invoke: async () => ({
    content: 'This is a test title',
    role: 'assistant',
  }),
};

export const artifactModel = {
  name: 'mock-artifact-model',
  invoke: async () => ({
    content: 'Hello, world!',
    role: 'assistant',
  }),
};

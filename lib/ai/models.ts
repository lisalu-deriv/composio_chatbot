import { availableModels, getDefaultModel, type ModelConfig } from './providers';

// Lazy evaluation of default model to avoid client-side environment variable access
export const getDefaultChatModel = (): string => {
  try {
    return getDefaultModel();
  } catch (error) {
    // Fallback to first available model if no API keys are configured
    return availableModels[0]?.id || 'claude-3-5-haiku-latest';
  }
};

// For backward compatibility, but should be used carefully
export const DEFAULT_CHAT_MODEL: string = 'claude-3-5-haiku-latest';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
  provider: string;
  contextWindow: number;
  supportsStreaming: boolean;
}

// Export available models for the UI
export const chatModels: Array<ChatModel> = availableModels.map(model => ({
  id: model.id,
  name: model.name,
  description: model.description,
  provider: model.provider,
  contextWindow: model.contextWindow,
  supportsStreaming: model.supportsStreaming,
}));

// Get models by provider
export const getModelsByProvider = (providerName: string): ChatModel[] => {
  return chatModels.filter(model => model.provider === providerName);
};

// Get model by ID
export const getModelById = (modelId: string): ChatModel | undefined => {
  return chatModels.find(model => model.id === modelId);
};

// Check if model exists
export const isValidModel = (modelId: string): boolean => {
  return chatModels.some(model => model.id === modelId);
};

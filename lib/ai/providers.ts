import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { isTestEnvironment } from '../constants';

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextWindow: number;
  supportsStreaming: boolean;
}

export interface ModelProvider {
  name: string;
  displayName: string;
  createModel: (modelId: string, options?: ModelOptions) => any;
}

export interface ModelOptions {
  streaming?: boolean;
  temperature?: number;
}

// Available models configuration
export const availableModels: ModelConfig[] = [
  // OpenAI Models
  {
    id: 'o3',
    name: 'O3',
    provider: 'openai',
    description: 'Latest reasoning model, optimized for efficiency',
    contextWindow: 128000,
    supportsStreaming: true,
  },
  {
    id: 'gpt-5-mini',
    name: 'GPT-5 Mini',
    provider: 'openai',
    description: 'Advanced general-purpose model',
    contextWindow: 128000,
    supportsStreaming: true,
  },
  {
    id: 'gpt-5-nano',
    name: 'GPT-5 Nano',
    provider: 'openai',
    description: 'Ultra-fast lightweight model',
    contextWindow: 64000,
    supportsStreaming: true,
  },
  
  // Anthropic Models
  {
    id: 'claude-4-sonnet',
    name: 'Claude 4 Sonnet',
    provider: 'anthropic',
    description: 'Most capable Claude model',
    contextWindow: 200000,
    supportsStreaming: true,
  },
  {
    id: 'claude-3-7-sonnet-latest',
    name: 'Claude 3.7 Sonnet',
    provider: 'anthropic',
    description: 'Enhanced reasoning and analysis',
    contextWindow: 200000,
    supportsStreaming: true,
  },
  {
    id: 'claude-3-5-haiku-latest',
    name: 'Claude 3.5 Haiku',
    provider: 'anthropic',
    description: 'Fast and efficient for everyday tasks',
    contextWindow: 200000,
    supportsStreaming: true,
  },
  
  // Gemini Models
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'gemini',
    description: 'High-performance multimodal model',
    contextWindow: 1000000,
    supportsStreaming: true,
  },
  {
    id: 'gemini-2.5-flash-lite',
    name: 'Gemini 2.5 Flash Lite',
    provider: 'gemini',
    description: 'Lightweight version for faster responses',
    contextWindow: 1000000,
    supportsStreaming: true,
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'gemini',
    description: 'Professional-grade reasoning model',
    contextWindow: 2000000,
    supportsStreaming: true,
  },
];

// OpenAI Provider
export const openaiProvider: ModelProvider = {
  name: 'openai',
  displayName: 'OpenAI',
  createModel: (modelId: string, options = {}) => {
    const { streaming = true, ...otherOptions } = options;
    return new ChatOpenAI({
      modelName: modelId,
      ...otherOptions,
      streaming,
      openAIApiKey: process.env.OPENAI_API_KEY,
      configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
      },
    });
  },
};

// Anthropic Provider
export const anthropicProvider: ModelProvider = {
  name: 'anthropic',
  displayName: 'Anthropic',
  createModel: (modelId: string, options = {}) => {
    const { streaming = true, temperature = 0.7 } = options;
    return new ChatAnthropic({
      model: modelId,
      temperature,
      streaming,
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    });
  },
};

// Gemini Provider
export const geminiProvider: ModelProvider = {
  name: 'gemini',
  displayName: 'Google Gemini',
  createModel: (modelId: string, options = {}) => {
    const { streaming = true, temperature = 0.7 } = options;
    return new ChatGoogleGenerativeAI({
      modelName: modelId,
      temperature,
      streaming,
      apiKey: process.env.GEMINI_API_KEY,
    });
  },
};

// Mock provider for testing
const mockProvider: ModelProvider = {
  name: 'mock',
  displayName: 'Mock Provider',
  createModel: () => {
    throw new Error('Mock model not implemented yet');
  },
};

// Provider registry
export const providers: Record<string, ModelProvider> = {
  openai: openaiProvider,
  anthropic: anthropicProvider,
  gemini: geminiProvider,
  mock: mockProvider,
};

// Get models by provider
export const getModelsByProvider = (providerName: string): ModelConfig[] => {
  return availableModels.filter(model => model.provider === providerName);
};

// Get all available providers
export const getAvailableProviders = (): ModelProvider[] => {
  if (isTestEnvironment) {
    return [mockProvider];
  }
  
  const availableProviders: ModelProvider[] = [];
  
  if (process.env.OPENAI_API_KEY) {
    availableProviders.push(openaiProvider);
  }
  
  if (process.env.ANTHROPIC_API_KEY) {
    availableProviders.push(anthropicProvider);
  }
  
  if (process.env.GEMINI_API_KEY) {
    availableProviders.push(geminiProvider);
  }
  
  return availableProviders;
};

// Get provider by name
export const getProvider = (providerName: string): ModelProvider => {
  const provider = providers[providerName];
  if (!provider) {
    throw new Error(`Unknown provider: ${providerName}`);
  }
  return provider;
};

// Get model configuration by ID
export const getModelConfig = (modelId: string): ModelConfig | undefined => {
  return availableModels.find(model => model.id === modelId);
};

// Create model instance by ID
export const createModelById = (
  modelId: string,
  options?: ModelOptions
): any => {
  const modelConfig = getModelConfig(modelId);
  if (!modelConfig) {
    throw new Error(`Unknown model: ${modelId}`);
  }
  
  const provider = getProvider(modelConfig.provider);
  return provider.createModel(modelId, options);
};

// Default model selection
export const getDefaultModel = (): string => {
  if (isTestEnvironment) {
    return 'mock-chat-model';
  }
  
  // Priority: OpenAI > Anthropic > Gemini
  if (process.env.OPENAI_API_KEY) {
    return 'gpt-5-mini';
  }
  
  if (process.env.ANTHROPIC_API_KEY) {
    return 'claude-3-5-haiku-latest';
  }
  
  if (process.env.GEMINI_API_KEY) {
    return 'gemini-2.5-flash-lite';
  }
  
  throw new Error('No API keys configured for any provider');
};

// Get default title model (faster, cheaper model for title generation)
export const getDefaultTitleModel = (): string => {
  if (isTestEnvironment) {
    return 'mock-chat-model';
  }
  
  if (process.env.OPENAI_API_KEY) {
    return 'gpt-5-nano';
  }
  
  if (process.env.ANTHROPIC_API_KEY) {
    return 'claude-3-5-haiku-latest';
  }
  
  if (process.env.GEMINI_API_KEY) {
    return 'gemini-2.5-flash-lite';
  }
  
  throw new Error('No API keys configured for any provider');
};

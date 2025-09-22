import { customProvider } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { isTestEnvironment } from '../constants';
import { chatModel, titleModel } from './models.test';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': chatModel,
        'title-model': titleModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': anthropic('claude-4-sonnet-20250514'),
        'chat-model-reasoning': anthropic('claude-3-5-sonnet-latest'),
        'title-model': anthropic('claude-3-5-haiku-latest'),
      },
    });

// OpenAI models for LangGraph compatibility
export const openaiModels = {
  'gpt-4o': openai('gpt-4o'),
  'gpt-4o-mini': openai('gpt-4o-mini'),
};

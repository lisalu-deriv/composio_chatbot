import type { Message as VercelChatMessage } from 'ai';
import {
  AIMessage,
  type BaseMessage,
  ChatMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages';
import { generateUUID } from '@/lib/utils';

/**
 * Converts Vercel AI SDK message format to LangChain message format
 * Used when passing messages from the frontend to LangGraph agents
 */
export const convertVercelMessageToLangChainMessage = (message: VercelChatMessage): BaseMessage => {
  // Validate message structure
  if (!message || typeof message !== 'object') {
    throw new Error('Invalid message: message must be an object');
  }
  
  if (!message.role) {
    throw new Error('Invalid message: role is required');
  }
  
  // Handle content - it might be string or undefined
  const content = message.content || '';
  
  if (message.role === 'user') {
    return new HumanMessage(content);
  } else if (message.role === 'assistant') {
    return new AIMessage(content);
  } else if (message.role === 'system') {
    return new SystemMessage(content);
  } else {
    return new ChatMessage(content, message.role);
  }
};

/**
 * Converts LangChain message format to Vercel AI SDK message format
 * Used when returning messages from LangGraph agents to the frontend
 */
export const convertLangChainMessageToVercelMessage = (message: BaseMessage): VercelChatMessage => {
  const messageType = message._getType();
  const content = message.content as string;
  const id = generateUUID();
  
  if (messageType === 'human') {
    return {
      id,
      content,
      role: 'user'
    };
  } else if (messageType === 'ai') {
    const aiMessage = message as AIMessage;
    return {
      id,
      content,
      role: 'assistant',
      // Only include tool_calls if they exist and are not empty
      ...(aiMessage.tool_calls && aiMessage.tool_calls.length > 0 && {
        experimental_tool_calls: aiMessage.tool_calls
      })
    };
  } else if (messageType === 'system') {
    return {
      id,
      content,
      role: 'system'
    };
  } else {
    // Map other message types to assistant role as fallback
    return {
      id,
      content,
      role: 'assistant'
    };
  }
};

/**
 * Converts an array of Vercel messages to LangChain messages
 */
export const convertVercelMessagesToLangChain = (messages: VercelChatMessage[]): BaseMessage[] => {
  if (!Array.isArray(messages)) {
    console.error('convertVercelMessagesToLangChain: messages must be an array', messages);
    return [];
  }
  
  return messages
    .filter(message => message && typeof message === 'object')
    .map((message, index) => {
      try {
        return convertVercelMessageToLangChainMessage(message);
      } catch (error) {
        console.error(`Error converting message at index ${index}:`, error, message);
        // Return a fallback message to prevent complete failure
        return new HumanMessage('');
      }
    });
};

/**
 * Converts an array of LangChain messages to Vercel messages
 */
export const convertLangChainMessagesToVercel = (messages: BaseMessage[]): VercelChatMessage[] => {
  return messages.map(convertLangChainMessageToVercelMessage);
};
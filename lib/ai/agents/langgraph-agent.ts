import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage } from '@langchain/core/messages';
import { getComposioLangchainTools } from '@/lib/ai/tools/composio-langchain';
import { DynamicTool } from '@langchain/community/tools/dynamic';
import { z } from 'zod';

/**
 * Configuration for the LangGraph React Agent
 */
export interface LangGraphAgentConfig {
  userId: string;
  toolkitSlugs: string[];
  systemPrompt: string;
  model?: string;
  temperature?: number;
  maxSteps?: number;
}

/**
 * Creates a LangChain-compatible weather tool
 */
const createWeatherTool = (): DynamicTool => {
  return new DynamicTool({
    name: 'getWeather',
    description: 'Get the current weather for a location. Use this when users ask about weather conditions.',
    func: async (input: string) => {
      try {
        // Parse the input to extract location parameters
        const params = JSON.parse(input);
        const { latitude, longitude } = params;
        
        // Call the weather API directly
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
        );
        
        const weatherData = await response.json();
        return JSON.stringify(weatherData);
      } catch (error) {
        console.error('Weather tool error:', error);
        return 'Failed to get weather information';
      }
    },
  });
};

/**
 * Creates a LangGraph React Agent with Composio tools integration
 * This agent handles tool calling and reasoning while maintaining compatibility with AI SDK streaming
 */
export async function createLangGraphAgent(config: LangGraphAgentConfig) {
  const {
    userId,
    toolkitSlugs,
    systemPrompt,
    model = 'gpt-4o',
    temperature = 0,
    maxSteps = 5,
  } = config;

  // Initialize the OpenAI chat model
  const chat = new ChatOpenAI({
    model,
    temperature,
  });

  // Fetch Composio tools for LangChain
  const composioTools = await getComposioLangchainTools(userId, toolkitSlugs);
  
  // Create weather tool
  const weatherTool = createWeatherTool();
  
  // Combine all tools - ensure proper typing
  const tools = [weatherTool, ...composioTools].filter(Boolean);

  // Create the React agent with system prompt and tools
  const agent = createReactAgent({
    llm: chat,
    tools: tools as any[], // Type assertion for LangGraph compatibility
    messageModifier: new SystemMessage(systemPrompt),
  });

  return {
    agent,
    maxSteps,
    tools,
  };
}

/**
 * Executes the LangGraph agent with message history and returns the result
 */
export async function executeLangGraphAgent(
  agent: any,
  messages: any[],
  maxSteps: number = 5
) {
  try {
    // Execute the agent with the message history
    const result = await agent.invoke(
      { messages },
      { 
        recursionLimit: maxSteps,
        configurable: {
          thread_id: 'default',
        }
      }
    );

    return result;
  } catch (error) {
    console.error('LangGraph agent execution error:', error);
    throw error;
  }
}

/**
 * Streams the LangGraph agent execution for real-time responses
 */
export async function streamLangGraphAgent(
  agent: any,
  messages: any[],
  maxSteps: number = 5
) {
  try {
    // Stream events from the agent execution
    const eventStream = await agent.streamEvents(
      { messages },
      { 
        version: 'v2',
        recursionLimit: maxSteps,
        configurable: {
          thread_id: 'default',
        }
      }
    );

    return eventStream;
  } catch (error) {
    console.error('LangGraph agent streaming error:', error);
    throw error;
  }
}
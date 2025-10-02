import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage } from '@langchain/core/messages';
import { getComposioToolsWithSearch } from '@/lib/ai/tools/composio-search';
import { createToolSearchTool, createListToolsTool } from '@/lib/ai/tools/dynamic-tool-search';
import { DynamicTool } from '@langchain/community/tools/dynamic';
import { z } from 'zod';
import { getAgentConfig } from '@/lib/config/agents';

const enrichDownloadResponse = async (result: any) => {
  const downloadedContent = result?.data?.downloaded_file_content;

  if (downloadedContent?.s3url && !downloadedContent.content) {
    console.log('📦 Attempting to fetch Composio S3 URL:', downloadedContent.s3url);

    try {
      const response = await fetch(downloadedContent.s3url);
      const text = await response.text();

      console.log('📥 Fetched content from Composio S3 URL:', {
        url: downloadedContent.s3url,
        preview: text.slice(0, 500),
        length: text.length,
        timestamp: new Date().toISOString(),
      });

      return {
        ...result,
        data: {
          ...result.data,
          downloaded_file_content: {
            ...downloadedContent,
            content: text,
          },
        },
      };
    } catch (error) {
      console.error('Failed to fetch content from Composio S3 URL:', error);
    }
  }

  return result;
};

const formatDownloadSummary = (data: any): string | null => {
  const download = data?.downloaded_file_content;

  if (!download?.content) {
    return null;
  }

  const name = data?.name ?? 'Unknown file';
  const mimeType = data?.mimeType ?? download?.mimeType ?? 'unknown';

  return [
    `File: ${name} (${mimeType})`,
    '',
    download.content,
  ].join('\n');
};

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
  shouldSeedDriveListing?: boolean;
  enableToolSearch?: boolean;
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
        // 🔍 LOG: Weather tool execution
        console.log('🌤️ Weather tool called with input:', input);
        
        // Parse the input to extract location parameters
        const params = JSON.parse(input);
        const { latitude, longitude } = params;
        
        console.log('📍 Weather API request:', { latitude, longitude });
        
        // Call the weather API directly
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
        );
        
        const weatherData = await response.json();
        
        console.log('🌡️ Weather API response received:', {
          temperature: weatherData.current?.temperature_2m,
          timezone: weatherData.timezone,
          timestamp: new Date().toISOString(),
        });
        
        return JSON.stringify(weatherData);
      } catch (error) {
        console.error('❌ Weather tool error:', error);
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
    model,
    temperature,
    maxSteps,
    shouldSeedDriveListing = true,
    enableToolSearch = true,
  } = config;

  const agentConfig = getAgentConfig('react_agent');

  const resolvedModel = model ?? agentConfig.model;
  const resolvedTemperature = temperature ?? agentConfig.parameters.temperature;
  const resolvedMaxSteps = maxSteps ?? agentConfig.parameters.maxSteps;
  const resolvedSystemPrompt = systemPrompt ?? agentConfig.prompts.system;
  const resolvedDriveSeeding = shouldSeedDriveListing ?? agentConfig.seeding?.driveList ?? true;
  const additionalSeedTools = agentConfig.seeding?.tools ?? [];
  const resolvedToolSearch = enableToolSearch;

  // Initialize the OpenAI chat model
  const chat = new ChatOpenAI({
    model: resolvedModel,
    temperature: resolvedTemperature,
  });

  // Fetch Composio tools using the enhanced search-based approach
  console.log('🔧 Fetching tools with search capability...');
  const normalizedToolkitSlugs = toolkitSlugs.map((slug) => slug.toUpperCase());

  const shouldSeedGithubTools = normalizedToolkitSlugs.some((slug) =>
    slug.startsWith('GITHUB'),
  );

  const searchQueries: string[] = [];
  const specificTools: string[] = [];

  if (shouldSeedGithubTools) {
    specificTools.push('GITHUB_LIST_BRANCHES', 'GITHUB_GET_A_BRANCH');
    if (resolvedToolSearch) {
      searchQueries.push('branch repository list');
    }
  }

  if (normalizedToolkitSlugs.includes('GOOGLEDRIVE') && resolvedDriveSeeding) {
    specificTools.push('GOOGLEDRIVE_LIST_FILES');
    if (resolvedToolSearch) {
      searchQueries.push('list files drive');
    }
  }

  for (const toolName of additionalSeedTools) {
    if (!specificTools.includes(toolName)) {
      specificTools.push(toolName);
    }
  }

  const composioTools = await getComposioToolsWithSearch(userId, {
    toolkitSlugs,
    searchQueries,
    specificTools,
    topToolsLimit: 20,
    searchLimit: 10,
  });
  
  // Create weather tool
  const weatherTool = createWeatherTool();
  
  // Create dynamic tool search capability
  const toolSearchTool = createToolSearchTool(userId);
  const listToolsTool = createListToolsTool(composioTools);
  
  // Combine all tools - ensure proper typing
  const tools = [weatherTool, toolSearchTool, listToolsTool, ...composioTools]
    .filter(Boolean)
    .map((tool) => {
      if (tool && typeof (tool as any).func === 'function') {
        const originalFunc = (tool as any).func;

        (tool as any).func = async (...args: unknown[]) => {
          const output = await originalFunc.apply(tool, args);
          const enrichedOutput = await enrichDownloadResponse(output);

          const summary = formatDownloadSummary(enrichedOutput?.data);

          if (summary) {
            return {
              ...enrichedOutput,
              data: {
                ...enrichedOutput.data,
                summary,
                downloaded_file_content: {
                  ...enrichedOutput.data.downloaded_file_content,
                  summary,
                },
              },
            };
          }

          return enrichedOutput;
        };
      }

      return tool;
    });
  
  console.log('🛠️ LangGraph agent tools summary:', {
    weatherTool: 1,
    toolSearchTool: 1,
    listToolsTool: 1,
    composioTools: composioTools.length,
    totalTools: tools.length,
    sampleComposioTools: composioTools.slice(0, 5).map(t => t.name),
  });

  // Create the React agent with system prompt and tools
  const agent = createReactAgent({
    llm: chat,
    tools: tools as any[], // Type assertion for LangGraph compatibility
    messageModifier: new SystemMessage(resolvedSystemPrompt),
    name: 'react-agent',
    description: 'LangGraph React agent for Composio chat',
  });

  // Name the top-level agent runnable (helps reduce anonymous-chain spam)
  const namedAgent = agent.withConfig({ runName: 'prompt-chain:react-agent' });

  return {
    agent: namedAgent,
    maxSteps: resolvedMaxSteps,
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
    // 🔍 LOG: Starting agent stream
    console.log('\n=== LANGGRAPH STREAM START ===');
    console.log('🚀 Starting LangGraph agent stream:', {
      messageCount: messages.length,
      maxSteps,
      timestamp: new Date().toISOString(),
    });

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
    console.error('❌ LangGraph agent streaming error:', error);
    throw error;
  }
}
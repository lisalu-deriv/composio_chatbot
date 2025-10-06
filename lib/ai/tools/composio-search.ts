import { Composio } from '@composio/core';
import { LangchainProvider } from '@composio/langchain';

/**
 * Type definition for Composio tools
 */
interface ComposioTool {
  name: string;
  description?: string;
  [key: string]: any;
}

/**
 * Composio client instance for tool search operations
 */
const composioSearch = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new LangchainProvider(),
});

/**
 * Search for Composio tools using semantic search
 * This allows agents to dynamically find tools based on their needs
 */
export async function searchComposioTools(
  userId: string, 
  searchQuery: string, 
  toolkitSlugs?: string[], 
  limit = 10
) {
  try {
    console.log('🔍 Searching for Composio tools:', {
      searchQuery,
      toolkitSlugs,
      limit,
      timestamp: new Date().toISOString(),
    });

    const tools = await composioSearch.tools.get(userId, {
      search: searchQuery,
      toolkits: toolkitSlugs,
      limit,
    });

    const toolArray = (Array.isArray(tools) ? tools : Object.values(tools || {})) as ComposioTool[];
    
    console.log('✅ Search results:', {
      query: searchQuery,
      toolsFound: toolArray.length,
      toolNames: toolArray.map(tool => tool.name).slice(0, 5), // Log first 5 tool names
    });

    return toolArray;
  } catch (error) {
    console.error('❌ Failed to search Composio tools:', error);
    return [];
  }
}

/**
 * Get specific tools by their exact names
 * Useful when the agent knows exactly which tools it needs
 */
export async function getSpecificComposioTools(
  userId: string, 
  toolNames: string[]
) {
  try {
    console.log('🎯 Getting specific Composio tools:', {
      toolNames,
      timestamp: new Date().toISOString(),
    });

    const tools = await composioSearch.tools.get(userId, {
      tools: toolNames,
    });

    const toolArray = (Array.isArray(tools) ? tools : Object.values(tools || {})) as ComposioTool[];
    
    console.log('✅ Specific tools retrieved:', {
      requested: toolNames.length,
      found: toolArray.length,
      foundTools: toolArray.map(tool => tool.name),
    });

    return toolArray;
  } catch (error) {
    console.error('❌ Failed to get specific Composio tools:', error);
    return [];
  }
}

/**
 * Combined tool fetching strategy:
 * 1. Get top N important tools from toolkits
 * 2. Search for additional tools based on query
 * 3. Get specific tools if requested
 * 4. Deduplicate and return combined results
 */
export async function getComposioToolsWithSearch(
  userId: string,
  options: {
    toolkitSlugs?: string[];
    searchQueries?: string[];
    specificTools?: string[];
    topToolsLimit?: number;
    searchLimit?: number;
  }
) {
  const {
    toolkitSlugs = [],
    searchQueries = [],
    specificTools = [],
    topToolsLimit = 20,
    searchLimit = 10,
  } = options;

  const allTools: ComposioTool[] = [];
  const toolNames = new Set<string>();

  try {
    // 1. Get top important tools from toolkits
    if (toolkitSlugs.length > 0) {
      console.log('📊 Fetching top tools from toolkits...');
      const topTools = await composioSearch.tools.get(userId, {
        toolkits: toolkitSlugs,
        limit: topToolsLimit,
      });

      const topToolArray = (Array.isArray(topTools) ? topTools : Object.values(topTools || {})) as ComposioTool[];
      topToolArray.forEach(tool => {
        if (!toolNames.has(tool.name)) {
          allTools.push(tool);
          toolNames.add(tool.name);
        }
      });
    }

    // 2. Search for additional tools
    for (const searchQuery of searchQueries) {
      console.log(`🔍 Searching for: "${searchQuery}"`);
      const searchResults = await searchComposioTools(
        userId, 
        searchQuery, 
        toolkitSlugs.length > 0 ? toolkitSlugs : undefined, 
        searchLimit
      );

      searchResults.forEach(tool => {
        if (!toolNames.has(tool.name)) {
          allTools.push(tool);
          toolNames.add(tool.name);
        }
      });
    }

    // 3. Get specific tools
    if (specificTools.length > 0) {
      console.log('🎯 Fetching specific tools...');
      const specificResults = await getSpecificComposioTools(userId, specificTools);
      
      specificResults.forEach(tool => {
        if (!toolNames.has(tool.name)) {
          allTools.push(tool);
          toolNames.add(tool.name);
        }
      });
    }

    console.log('🎉 Combined tool fetching complete:', {
      totalTools: allTools.length,
      fromToolkits: topToolsLimit,
      fromSearch: searchQueries.length * searchLimit,
      fromSpecific: specificTools.length,
      timestamp: new Date().toISOString(),
    });

    return allTools;

  } catch (error) {
    console.error('❌ Failed to get tools with search:', error);
    return [];
  }
}

export default composioSearch;
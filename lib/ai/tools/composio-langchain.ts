import { Composio } from '@composio/core';
import { LangchainProvider } from '@composio/langchain';

/**
 * Composio client instance for LangGraph/LangChain integration
 * This provides tools in LangChain format for use with LangGraph agents
 */
const composioLangchain = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new LangchainProvider(),
});

/**
 * Fetches Composio tools for LangGraph agents based on enabled toolkits
 * Returns tools in LangChain format compatible with LangGraph
 */
export async function getComposioLangchainTools(userId: string, toolkitSlugs: string[]) {
  if (!toolkitSlugs || toolkitSlugs.length === 0) {
    return [];
  }

  try {
    const tools = await composioLangchain.tools.get(userId, {
      toolkits: toolkitSlugs,
      limit: 30, 
    });
    
    // Convert to array format expected by LangGraph
    return Array.isArray(tools) ? tools : Object.values(tools || {});
  } catch (error) {
    console.error('Failed to fetch Composio LangChain tools:', error);
    return [];
  }
}

export default composioLangchain;
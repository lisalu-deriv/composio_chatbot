import { DynamicTool } from '@langchain/community/tools/dynamic';
import { z } from 'zod';
import { searchComposioTools, getSpecificComposioTools } from './composio-search';

/**
 * Creates a dynamic tool that allows the agent to search for and retrieve Composio tools
 * This enables the agent to find tools it needs based on the user's request
 */
export function createToolSearchTool(userId: string): DynamicTool {
  return new DynamicTool({
    name: 'searchComposioTools',
    description: `Search for Composio tools based on keywords or get specific tools by name.
    Use this when you need tools that aren't currently available but might exist in Composio.
    
    Input should be a JSON string with these optional properties:
    - searchQuery: Keywords to search for tools (e.g., "branch repository", "email send")
    - specificTools: Array of exact tool names to retrieve (e.g., ["GITHUB_LIST_BRANCHES"])
    - toolkits: Array of toolkit names to limit search (e.g., ["github", "gmail"])
    - limit: Maximum number of tools to return (default: 10)
    
    Examples:
    - {"searchQuery": "branch repository", "toolkits": ["github"]}
    - {"specificTools": ["GITHUB_LIST_BRANCHES"]}
    - {"searchQuery": "email send", "limit": 5}`,
    func: async (input: string) => {
      try {
        console.log('🔍 Agent searching for tools:', input);
        console.log('🔍 Input type:', typeof input);
        
        // Handle different input formats
        let params: any = {};
        
        if (typeof input === 'string') {
          if (input === 'undefined' || input === '' || !input) {
            // Default search for branch tools if no input provided
            params = {
              searchQuery: "list branches repository",
              toolkits: ["github"],
              limit: 10
            };
          } else {
            try {
              params = JSON.parse(input);
            } catch (parseError) {
              // If JSON parsing fails, treat as a search query
              params = {
                searchQuery: input,
                toolkits: ["github"],
                limit: 10
              };
            }
          }
        } else if (typeof input === 'object' && input !== null) {
          params = input;
        } else {
          // Fallback to default search
          params = {
            searchQuery: "list branches repository",
            toolkits: ["github"],
            limit: 10
          };
        }
        
        const { searchQuery, specificTools, toolkits, limit = 10 } = params;
        
        console.log('🔍 Parsed params:', { searchQuery, specificTools, toolkits, limit });

        let foundTools: any[] = [];

        // Search for tools if search query is provided
        if (searchQuery) {
          console.log(`🔍 Searching for tools with query: "${searchQuery}"`);
          const searchResults = await searchComposioTools(
            userId,
            searchQuery,
            toolkits,
            limit
          );
          foundTools.push(...searchResults);
        }

        // Get specific tools if tool names are provided
        if (specificTools && specificTools.length > 0) {
          console.log('🎯 Getting specific tools:', specificTools);
          const specificResults = await getSpecificComposioTools(userId, specificTools);
          foundTools.push(...specificResults);
        }

        // Remove duplicates
        const uniqueTools = foundTools.filter((tool, index, self) => 
          index === self.findIndex(t => t.name === tool.name)
        );

        const result = {
          success: true,
          toolsFound: uniqueTools.length,
          tools: uniqueTools.map(tool => ({
            name: tool.name,
            description: tool.description || 'No description available',
          })),
          message: uniqueTools.length > 0 
            ? `Found ${uniqueTools.length} tools. These tools are now available for use.`
            : 'No tools found matching the search criteria.',
        };

        console.log('✅ Tool search completed:', {
          query: searchQuery,
          specificTools,
          toolsFound: uniqueTools.length,
          toolNames: uniqueTools.map(t => t.name).slice(0, 5),
        });

        return JSON.stringify(result);
      } catch (error) {
        console.error('❌ Tool search error:', error);
        return JSON.stringify({
          success: false,
          error: 'Failed to search for tools',
          message: 'There was an error searching for tools. Please try again.',
        });
      }
    },
  });
}

/**
 * Creates a tool that lists all available tools for debugging
 */
export function createListToolsTool(availableTools: any[]): DynamicTool {
  return new DynamicTool({
    name: 'listAvailableTools',
    description: 'List all currently available tools and their descriptions. Use this to see what tools you can use.',
    func: async () => {
      try {
        const toolList = availableTools.map((tool, index) => ({
          index: index + 1,
          name: tool.name,
          description: tool.description || 'No description available',
        }));

        const result = {
          success: true,
          totalTools: availableTools.length,
          tools: toolList,
          message: `You have ${availableTools.length} tools available.`,
        };

        return JSON.stringify(result, null, 2);
      } catch (error) {
        console.error('❌ List tools error:', error);
        return JSON.stringify({
          success: false,
          error: 'Failed to list tools',
        });
      }
    },
  });
}
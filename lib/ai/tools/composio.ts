import composio from '@/lib/services/composio';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';

/**
 * Fetches Composio tools for a user based on enabled toolkits
 * This is used specifically for LangChain/LangGraph tool integration
 */
export async function getComposioTools(
  userId: string, 
  toolkitSlugs: string[]
): Promise<DynamicStructuredTool[]> {
  if (!toolkitSlugs || toolkitSlugs.length === 0) {
    return [];
  }

  try {
    const tools = await composio.tools.get(userId, {
      toolkits: toolkitSlugs,
    });
    
    // The LangchainProvider should return DynamicStructuredTool instances
    // Ensure schema compatibility with OpenAI requirements
    return (Array.isArray(tools) ? tools : []).map(tool => {
      // Create new tool instance with validated schema
      const fixSchema = (schema: z.ZodTypeAny): z.ZodTypeAny => {
        // Handle optional types
        if (schema instanceof z.ZodOptional) {
          return fixSchema(schema.unwrap()).nullable().optional();
        }
        
        // Handle nullable types
        if (schema instanceof z.ZodNullable) {
          return fixSchema(schema.unwrap()).nullable();
        }
        
        // Recursively process object shapes
        if (schema instanceof z.ZodObject) {
          const shape = schema.shape;
          const newShape: Record<string, z.ZodTypeAny> = {};
          for (const key in shape) {
            newShape[key] = fixSchema(shape[key]);
          }
          return z.object(newShape).catchall(z.any());
        }
        
        // Process array elements
        if (schema instanceof z.ZodArray) {
          return z.array(fixSchema(schema.element));
        }
        
        // Handle union types
        if (schema instanceof z.ZodUnion) {
          return z.union(schema.options.map(fixSchema));
        }
        
        // Default case - return original schema with nullability
        return schema.nullable();
      };

      return new DynamicStructuredTool({
        name: tool.name,
        description: tool.description,
        schema: fixSchema(tool.schema),
        func: tool.func
      });
    });
  } catch (error) {
    console.error('Failed to fetch Composio tools:', error);
    return [];
  }
}

/**
 * Get available toolkits for a user
 */
export async function getAvailableToolkits(userId: string) {
  try {
    const toolkits = await composio.toolkits.get(userId);
    return toolkits || [];
  } catch (error) {
    console.error('Failed to fetch available toolkits:', error);
    return [];
  }
}

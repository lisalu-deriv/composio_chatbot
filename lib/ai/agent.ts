import { StateGraph, MessagesAnnotation, START, END } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { HumanMessage, AIMessage, BaseMessage } from '@langchain/core/messages';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { createModelById } from './providers';
import { systemPrompt, type RequestHints } from './prompts';

export interface AgentConfig {
  modelId: string;
  maxSteps?: number;
  temperature?: number | undefined;
  requestHints?: RequestHints;
  tools?: any[];
}

export class ReActAgent {
  private modelId: string;
  private tools: any[];
  private maxSteps: number;
  private temperature: number;
  private requestHints?: RequestHints;
  private graph: any;

  constructor(config: AgentConfig) {
    const { modelId, maxSteps = 5, temperature, requestHints, tools = [] } = config;
    
    this.modelId = modelId;
    this.tools = tools;
    this.maxSteps = maxSteps;
    this.temperature = temperature;
    this.requestHints = requestHints;
    
    this.graph = this.createGraph();
  }

  private createGraph() {
    // Create a fresh model instance for this graph
    const model = createModelById(this.modelId, {
      temperature: this.temperature,
      streaming: true
    });

    // Convert tools to LangChain format for binding
    const langchainTools = this.tools.map(tool => {
      if (tool.function && tool.parameters) {
        // Convert our simple tool format to LangChain format
        return {
          name: tool.name,
          description: tool.description,
          schema: tool.parameters,
          func: tool.function,
        };
      }
      return tool; // Assume it's already in the right format
    });

    // Bind tools if available
    const modelWithTools = langchainTools.length > 0
      ? (model as any).bindTools(langchainTools)
      : model;

    // Create tool node if tools are provided
    const toolNode = langchainTools.length > 0 ? new ToolNode(langchainTools) : null;

    // Define the agent function
    const callModel = async (state: typeof MessagesAnnotation.State) => {
      const { messages } = state;
      
      try {
        // Add system message if request hints are provided
        let messagesToSend = messages;
        if (this.requestHints && messages.length > 0) {
          const systemMessage = new HumanMessage({
            content: systemPrompt({ 
              selectedChatModel: this.modelId, 
              requestHints: this.requestHints 
            })
          });
          messagesToSend = [systemMessage, ...messages];
        }

        const response = await modelWithTools.invoke(messagesToSend);
        return { messages: [response] };
      } catch (error) {
        console.error('Error calling model:', error);
        return {
          messages: [
            new AIMessage({
              content: "I encountered an error while processing your request. Please try again.",
            }),
          ],
        };
      }
    };

    // Define the conditional edge function
    const shouldContinue = (state: typeof MessagesAnnotation.State) => {
      const { messages } = state;
      const lastMessage = messages[messages.length - 1] as AIMessage;

      // If the LLM makes a tool call, route to tools
      if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
        return 'tools';
      }

      // Otherwise, end the conversation
      return END;
    };

    // Create the graph
    const workflow = new StateGraph(MessagesAnnotation)
      .addNode('agent', callModel)
      .addEdge(START, 'agent');

    // Add tool node if tools are available
    if (toolNode) {
      workflow
        .addNode('tools', toolNode)
        .addEdge('tools', 'agent')
        .addConditionalEdges('agent', shouldContinue, {
          tools: 'tools',
          [END]: END,
        });
    } else {
      workflow.addEdge('agent', END);
    }

    return workflow.compile();
  }

  async invoke(messages: BaseMessage[]): Promise<BaseMessage[]> {
    try {
      const result = await this.graph.invoke({
        messages,
      });

      return result.messages;
    } catch (error) {
      console.error('Error in agent execution:', error);
      return [
        new AIMessage({
          content: "I encountered an error while processing your request. Please try again.",
        }),
      ];
    }
  }

  async stream(messages: BaseMessage[]) {
    try {
      return this.graph.stream({
        messages,
      });
    } catch (error) {
      console.error('Error in agent streaming:', error);
      throw error;
    }
  }

  // Get available tools
  getTools(): any[] {
    return this.tools;
  }

  // Update configuration and recreate graph
  updateConfig(config: Partial<AgentConfig>) {
    if (config.modelId) this.modelId = config.modelId;
    if (config.maxSteps) this.maxSteps = config.maxSteps;
    if (config.temperature !== undefined) this.temperature = config.temperature;
    if (config.requestHints) this.requestHints = config.requestHints;
    if (config.tools) this.tools = config.tools;
    
    this.graph = this.createGraph();
  }
}

// Factory function to create a ReAct agent
export const createReActAgent = (config: AgentConfig): ReActAgent => {
  return new ReActAgent(config);
};

// Helper function to convert UI messages to LangChain messages
export const convertToLangChainMessages = (messages: any[]): BaseMessage[] => {
  return messages.map(msg => {
    switch (msg.role) {
      case 'user':
        return new HumanMessage({ 
          content: msg.content || msg.parts?.[0]?.text || '' 
        });
      case 'assistant':
        return new AIMessage({ 
          content: msg.content || msg.parts?.[0]?.text || '' 
        });
      default:
        return new HumanMessage({ 
          content: msg.content || msg.parts?.[0]?.text || '' 
        });
    }
  });
};

// Helper function to convert LangChain messages back to UI format
export const convertFromLangChainMessages = (messages: BaseMessage[]): any[] => {
  return messages.map(msg => ({
    id: Math.random().toString(36).substring(7),
    role: msg._getType() === 'human' ? 'user' : 'assistant',
    content: msg.content,
    createdAt: new Date(),
  }));
};
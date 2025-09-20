# Migration Guide: Vercel AI SDK to LangChain/LangGraph

This document outlines the complete migration from Vercel AI SDK to LangChain/LangGraph with ReAct agent architecture.

## 🚀 Overview

**Version 3.0** introduces a major architectural change:

- **From**: Vercel AI SDK with simple tool calling
- **To**: LangChain/LangGraph with ReAct (Reasoning and Acting) agent pattern

## 🎯 Benefits of Migration

### Enhanced AI Capabilities
- ✅ **Multi-step Reasoning**: Agent can plan, execute tools, and reason about results
- ✅ **Better Tool Integration**: More robust tool binding and execution
- ✅ **Provider Flexibility**: Easy switching between OpenAI, Anthropic, and Gemini
- ✅ **Industry Standard**: LangChain is the leading AI framework

### Technical Improvements
- ✅ **Streaming Support**: Real-time response streaming with LangGraph
- ✅ **Error Handling**: Better error recovery and fallback mechanisms
- ✅ **Extensibility**: Easier to add new tools and capabilities
- ✅ **Type Safety**: Improved TypeScript support

## 🔄 Key Changes

### 1. AI Framework Migration

#### Before (Vercel AI SDK)
```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = await streamText({
  model: openai('gpt-4'),
  messages,
  tools: { weather: weatherTool }
});
```

#### After (LangChain/LangGraph)
```typescript
import { createReActAgent } from '@/lib/ai/agent';

const agent = createReActAgent({
  modelId: 'gpt-5-mini',
  tools: [weatherTool, ...composioTools],
  maxSteps: 5
});

const stream = await agent.stream(messages);
```

### 2. Multi-Provider Support

#### Before
- Single provider per request
- Manual provider switching

#### After
```typescript
// Automatic provider selection based on available API keys
export const getDefaultModel = (): string => {
  if (process.env.OPENAI_API_KEY) return 'gpt-5-mini';
  if (process.env.ANTHROPIC_API_KEY) return 'claude-3-5-haiku-latest';
  if (process.env.GEMINI_API_KEY) return 'gemini-2.5-flash-lite';
  throw new Error('No API keys configured');
};
```

### 3. Tool System Overhaul

#### Before (AI SDK Tools)
```typescript
import { tool } from 'ai';

const weatherTool = tool({
  description: 'Get weather',
  parameters: z.object({
    location: z.string()
  }),
  execute: async ({ location }) => {
    // Implementation
  }
});
```

#### After (LangChain Tools)
```typescript
export const weatherTool = {
  name: 'get_weather',
  description: 'Get the current weather at a location',
  parameters: {
    type: 'object',
    properties: {
      latitude: { type: 'number', description: 'Latitude' },
      longitude: { type: 'number', description: 'Longitude' }
    },
    required: ['latitude', 'longitude']
  },
  function: async ({ latitude, longitude }) => {
    // Implementation
  }
} as const;
```

### 4. Streaming Implementation

#### Before (AI SDK Streaming)
```typescript
import { StreamingTextResponse } from 'ai';

return new StreamingTextResponse(result.toAIStream());
```

#### After (Custom Streaming)
```typescript
const encoder = new TextEncoder();
const stream = new ReadableStream({
  async start(controller) {
    const agentStream = await agent.stream(messages);
    
    for await (const chunk of agentStream) {
      const data = { type: 'text-delta', textDelta: chunk.content };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    }
    
    controller.close();
  }
});

return new Response(stream, {
  headers: { 'Content-Type': 'text/event-stream' }
});
```

### 5. Frontend Changes

#### Before (useChat Hook)
```typescript
import { useChat } from 'ai/react';

const { messages, input, handleInputChange, handleSubmit } = useChat();
```

#### After (Custom Implementation)
```typescript
// Custom message handling without AI SDK dependencies
const [messages, setMessages] = useState<UIMessage[]>([]);
const [input, setInput] = useState('');

const handleSubmit = async (e: FormEvent) => {
  // Custom streaming implementation
};
```

## 📁 File Structure Changes

### New Files
- `lib/ai/agent.ts` - ReAct agent implementation
- `lib/ai/providers.ts` - Multi-provider system
- `MIGRATION.md` - This migration guide

### Modified Files
- `app/(chat)/api/chat/route.ts` - Complete rewrite for LangChain
- `components/chat.tsx` - Removed AI SDK dependencies
- `lib/ai/tools/get-weather.ts` - Converted to LangChain format
- `lib/ai/tools/composio.ts` - Updated for LangChain integration

### Removed Dependencies
- `ai` package (Vercel AI SDK)
- `@ai-sdk/openai`
- `@ai-sdk/anthropic`

### Added Dependencies
- `@langchain/core`
- `@langchain/langgraph`
- `@langchain/openai`
- `@langchain/anthropic`
- `@langchain/google-genai`

## 🛠️ Migration Steps

### 1. Update Dependencies

```bash
# Remove old dependencies
npm uninstall ai @ai-sdk/openai @ai-sdk/anthropic

# Install new dependencies
npm install @langchain/core @langchain/langgraph @langchain/openai @langchain/anthropic @langchain/google-genai
```

### 2. Update Environment Variables

Add support for multiple providers:

```env
# At least one is required
OPENAI_API_KEY=your-openai-key
OPENAI_BASE_URL=https://api.openai.com/v1  # Optional
ANTHROPIC_API_KEY=your-anthropic-key
GEMINI_API_KEY=your-gemini-key
```

### 3. Update API Routes

Replace AI SDK streaming with custom LangGraph implementation:

```typescript
// Old: AI SDK
import { streamText } from 'ai';

// New: LangGraph
import { createReActAgent } from '@/lib/ai/agent';
```

### 4. Update Frontend Components

Remove AI SDK hooks and implement custom streaming:

```typescript
// Old: AI SDK hooks
import { useChat } from 'ai/react';

// New: Custom implementation
const [messages, setMessages] = useState<UIMessage[]>([]);
```

### 5. Update Tool Definitions

Convert tools to LangChain format:

```typescript
// Old: AI SDK tool
import { tool } from 'ai';

// New: LangChain tool
export const customTool = {
  name: 'tool_name',
  description: 'Tool description',
  parameters: { /* JSON schema */ },
  function: async (params) => { /* implementation */ }
};
```

## 🧪 Testing Migration

### 1. Build Test
```bash
npm run build
```

### 2. Development Test
```bash
npm run dev
```

### 3. Feature Tests
- Test chat functionality
- Test tool execution (weather, Composio)
- Test model switching
- Test streaming responses

## 🔧 Troubleshooting

### Common Issues

#### 1. "No API keys configured" Error
**Solution**: Ensure at least one AI provider API key is set in environment variables.

#### 2. Tool Binding Errors
**Solution**: Verify tool format matches LangChain expectations:
```typescript
{
  name: string,
  description: string,
  parameters: JSONSchema,
  function: async (params) => string
}
```

#### 3. Streaming Issues
**Solution**: Check server-sent events format and ensure proper content-type headers.

#### 4. TypeScript Errors
**Solution**: Remove AI SDK type imports and use local type definitions.

## 📊 Performance Comparison

| Aspect | Vercel AI SDK | LangChain/LangGraph |
|--------|---------------|---------------------|
| Tool Execution | Basic | Advanced (ReAct) |
| Multi-step Reasoning | Limited | Full Support |
| Provider Support | Single per request | Multi-provider |
| Streaming | Built-in | Custom (more control) |
| Extensibility | Moderate | High |
| Community | Growing | Mature |

## 🎉 Migration Complete!

After completing the migration, you'll have:

- ✅ **ReAct Agent**: Intelligent reasoning and tool usage
- ✅ **Multi-Provider Support**: OpenAI, Anthropic, and Gemini
- ✅ **Better Tool Integration**: More robust and extensible
- ✅ **Enhanced Streaming**: Custom streaming implementation
- ✅ **Future-Proof Architecture**: Built on industry-standard LangChain

## 📚 Additional Resources

- [LangChain Documentation](https://langchain.com/docs)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [ReAct Paper](https://arxiv.org/abs/2210.03629)
- [Composio Documentation](https://docs.composio.dev)

## 🤝 Support

If you encounter issues during migration:

1. Check the troubleshooting section above
2. Review the example implementations in the codebase
3. Open an issue on the repository
4. Consult LangChain documentation for advanced use cases

---

**Happy migrating! 🚀**
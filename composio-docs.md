- [Welcome to Composio](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/welcome.mdx): Our API and SDKs enable developers to build AI applications and experiences that are a step above the rest.
- [Quickstart](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/quickstart.mdx): Add authenticated tool-calling to any LLM agent in three steps.
- [Providers](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/toolsets.mdx)
- [Executing Tools](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/executing-tools.mdx): Learn how to execute Composio's tools with different providers and frameworks
- [Authenticating Tools](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/authenticating-tools.mdx): Learn how to authenticate tools
- [Fetching and Filtering Tools](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/fetching-tools.mdx): Learn how to fetch and filter Composio's tools and toolsets
- [Schema Modifiers](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/modifiers/schema-modifiers.mdx): Learn how to use schema modifiers to transform tool schemas before they are seen by agents.
- [Before Execution Modifiers](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/modifiers/before-execution.mdx): Learn how to use before execution modifiers to modify tool arguments before execution.
- [After Execution Modifiers](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/modifiers/after-execution.mdx): Learn how to use after execution modifiers to transform tool results after execution.
- [Custom Auth Configs](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/custom-auth-configs.mdx): Guide to using customising auth configs for a toolkit
- [Programmatic Auth Configs](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/programmatic-auth-configs.mdx): Guide to creating auth configs programmatically
- [Custom Auth Parameters](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/custom-auth-params.mdx): Guide to injecting custom credentials in headers or parameters for a toolkit
- [Using Triggers](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/docs/using-triggers.mdx): Send payloads to your system based on external events
- [Vercel AI SDK Provider](https://composio-preview-62f4ee07-889c-40c1-a9c1-3fb7f720df2f.docs.buildwithfern.com/v3/providers/vercel.mdx)
- [Langchain Provider]
---
title: LangChain Provider
slug: /providers/langchain
image:
  type: url
  value: 'https://og.composio.dev/api/og?title=LangChain%20Provider'
keywords: ''
hide-nav-links: false
---

The LangChain Provider transforms Composio tools into a format compatible with LangChain's function calling capabilities.

## Setup
<CodeGroup>
```bash title="Python" for="python"
pip install composio_langchain==0.8.0 langchain
```
```bash title="TypeScript" for="typescript"
npm install @composio/langchain
```
</CodeGroup>

## Usage

<CodeGroup>
```python Python title="Python" maxLines=40 
from composio import Composio
from composio_langchain import LangchainProvider
from langchain.chat_models import init_chat_model

model = init_chat_model("gpt-4o")
composio = Composio(provider=LangchainProvider())

tools_list = composio.tools.get(user_id="sid", toolkits=["LINEAR"])

model_with_tools = model.bind_tools(tools_list)
print(model_with_tools)

result = model_with_tools.invoke("What are the linear projects assigned to me?")
```
```typescript TypeScript title="TypeScript" maxLines=40 
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { StateGraph, MessagesAnnotation } from '@langchain/langgraph';
import { Composio } from '@composio/core';
import { LangchainProvider } from '@composio/langchain';
// initiate composio
const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new LangchainProvider(),
});

// fetch the tool
console.log(`🔄 Fetching the tool...`);
const tools = await composio.tools.get('default', 'HACKERNEWS_GET_USER');

// Define the tools for the agent to use
const toolNode = new ToolNode(tools);

// Create a model and give it access to the tools
const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
}).bindTools(tools);

// Define the function that determines whether to continue or not
function shouldContinue({ messages }: typeof MessagesAnnotation.State) {
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return 'tools';
  }
  // Otherwise, we stop (reply to the user) using the special "__end__" node
  return '__end__';
}

// Define the function that calls the model
async function callModel(state: typeof MessagesAnnotation.State) {
  console.log(`🔄 Calling the model...`);
  const response = await model.invoke(state.messages);

  // We return a list, because this will get added to the existing list
  return { messages: [response] };
}

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
  .addNode('agent', callModel)
  .addEdge('__start__', 'agent') // __start__ is a special name for the entrypoint
  .addNode('tools', toolNode)
  .addEdge('tools', 'agent')
  .addConditionalEdges('agent', shouldContinue);

// Finally, we compile it into a LangChain Runnable.
const app = workflow.compile();

// Use the agent
const finalState = await app.invoke({
  messages: [new HumanMessage('Find the details of the user `pg` on HackerNews')],
});
console.log(`✅ Message recieved from the model`);
console.log(finalState.messages[finalState.messages.length - 1].content);

const nextState = await app.invoke({
  // Including the messages from the previous run gives the LLM context.
  // This way it knows we're asking about the weather in NY
  messages: [...finalState.messages, new HumanMessage('what about haxzie')],
});
console.log(`✅ Message recieved from the model`);
console.log(nextState.messages[nextState.messages.length - 1].content);

```
</CodeGroup>


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
- [OpenAI Provider]
---
title: OpenAI Providers
slug: /providers/openai
image:
  type: url
  value: 'https://og.composio.dev/api/og?title=OpenAI%20Providers'
keywords: ''
hide-nav-links: false
---

The OpenAI Provider is the default provider for the Composio SDK. It transforms Composio tools into a format compatible with OpenAI's function calling capabilities through both the Responses and Chat Completion APIs.

## Setup
By default, the OpenAI Provider is installed when you install the Composio SDK. You can also install it manually:

<CodeGroup>
```bash title="Python" for="python"
pip install composio_openai==0.8.0
```
```bash title="TypeScript" for="typescript"
npm install @composio/openai
```
</CodeGroup>
The OpenAI Provider is used by default when you initialize the Composio SDK but you can explicitly specify it.

<CodeGroup>
```python Python title="Python" maxLines=40 
from openai import OpenAI
from composio import Composio
from composio_openai import OpenAIProvider

# Initialize Composio client with OpenAI Provider
composio = Composio(provider=OpenAIProvider())
openai = OpenAI()

```
```typescript TypeScript title="TypeScript" maxLines=40 
import { Composio } from '@composio/core';
import { OpenAIResponsesProvider, OpenAIProvider } from '@composio/openai';
import { OpenAI } from 'openai';

// Initialise Composio client with the OpenAI provider.
const composioForResponses = new Composio({ provider: new OpenAIResponsesProvider() });
const openai = new OpenAI();
```
</CodeGroup>

{/* ## Responses API
The Responses API is the recommended way to build more agentic flows with the OpenAI API. Read more about it in the [OpenAI documentation](https://platform.openai.com/docs/guides/responses-vs-chat-completions)

<CodeGroup>
```python

```
```typescript TypeScript title="TypeScript" maxLines=40 
// Initialise Composio client with the OpenAI provider.
const composioForResponses = new Composio({ provider: new OpenAIResponsesProvider() });
const openai = new OpenAI();

const userId = 'your@example.com';
const toolsForResponses = await composioForResponses.tools.get(userId, {
  toolkits: ['HACKERNEWS'],
});

const response = await openai.responses.create({
  model: 'gpt-4.1',
  input: "What's the lates Hackernews post about?",
  tools: toolsForResponses,
});

const result = await composioForResponses.provider.handleResponse(userId, response);

console.log('RESPONSE API');
console.log(JSON.stringify(result, null, 2));
// will return the raw response from the HACKERNEWS API.
```
</CodeGroup> */}

## Chat Completion API
Chat Completion API is the industry standard for building LLM-powered applications. Chat completions are also adopted and used by many other LLM providers apart from OpenAI.

<CodeGroup>
```python Python title="Python" maxLines=40 
user_id = "user@acme.org"
tools = composio.tools.get(user_id=user_id, toolkits=["HACKERNEWS"])

response = openai.chat.completions.create(
    model="gpt-4.1",
    tools=tools,
    messages=[
        {"role": "user", "content": "What's the latest Hackernews post about?"},
    ],
)

# Execute the function calls.
result = composio.provider.handle_tool_calls(response=response, user_id=user_id)
print(result)
# will return the raw response from the HACKERNEWS API.
```
```typescript TypeScript title="TypeScript" maxLines=40 
const composioForCompletions = new Composio({ provider: new OpenAIProvider() });
const toolsForCompletions = await composioForCompletions.tools.get(userId, {
  toolkits: ['HACKERNEWS'],
});

const completion = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    {
      role: 'user',
      content: 'What is the latest hackernews post about?',
    },
  ],
  tools: toolsForCompletions,
});

const newResult = await composioForCompletions.provider.handleToolCalls(userId, completion);

console.log(JSON.stringify(newResult, null, 2));
// will return the raw response from the HACKERNEWS API.
```

</CodeGroup>

{/* The tools can also be called manually:

<CodeGroup>
```typescript {20-27} maxLines={60}
const userId = "your@example.com";
const tools = await composio.tools.get(userId, {
  toolkits: ["HACKERNEWS"],
});

const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content: "What is the latest hackernews post about?",
    },
  ],
  tools: tools,
});

const toolCall = completion.choices[0]?.message.tool_calls?.[0];
if (toolCall) {
  console.log(`✅ Calling tool ${toolCall.function.name}`);
  const result = await composio.tools.execute(
    toolCall.function.name,
    {
      userId,
      arguments: JSON.parse(toolCall.function.arguments),
    }
  );
  console.log(JSON.stringify(result, null, 2));
}
```

```python

```
</CodeGroup> */}

## Modifiers
Modifiers are functions that can be used to intercept and optionally **modify** the schema, the tool call request and the response from the tool call.

OpenAI provider modifiers are the standard framework modifiers.
Read more here: [Modifying tool schemas](/docs/modifying-tool-schemas)


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


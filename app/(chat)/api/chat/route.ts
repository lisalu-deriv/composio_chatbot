import {
  appendClientMessage,
  appendResponseMessages,
  createDataStream,
  smoothStream,
  streamText,
} from 'ai';
import { auth, type UserType } from '@/app/(auth)/auth';
import { type RequestHints, systemPrompt } from '@/lib/ai/prompts';
import {
  createStreamId,
  deleteChatById,
  getChatById,
  getMessageCountByUserId,
  getMessagesByChatId,
  getStreamIdsByChatId,
  saveChat,
  saveMessages,
} from '@/lib/db/queries';
import { generateUUID, getTrailingMessageId } from '@/lib/utils';
import { generateTitleFromUserMessage } from '../../actions';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { isProductionEnvironment } from '@/lib/constants';
import { myProvider } from '@/lib/ai/providers';
import { entitlementsByUserType } from '@/lib/ai/entitlements';
import { postRequestBodySchema, type PostRequestBody } from './schema';
import { geolocation } from '@vercel/functions';
import {
  createResumableStreamContext,
  type ResumableStreamContext,
} from 'resumable-stream';
import { after } from 'next/server';
import type { Chat } from '@/lib/db/schema';
import { differenceInSeconds } from 'date-fns';
import { ChatSDKError } from '@/lib/errors';
import { getComposioTools } from '@/lib/ai/tools/composio';
// LangGraph imports
import { createLangGraphAgent, streamLangGraphAgent } from '@/lib/ai/agents/langgraph-agent';
import { getAgentConfig } from '@/lib/config/agents';
import {
  convertVercelMessagesToLangChain,
  convertLangChainMessageToVercelMessage
} from '@/lib/ai/utils/message-conversion';

export const maxDuration = 60;

let globalStreamContext: ResumableStreamContext | null = null;

function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: any) {
      if (error.message.includes('REDIS_URL')) {
        console.log(
          ' > Resumable streams are disabled due to missing REDIS_URL',
        );
      } else {
        console.error(error);
      }
    }
  }

  return globalStreamContext;
}

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (_) {
    return new ChatSDKError('bad_request:api').toResponse();
  }

  try {
    const {
      id,
      message,
      selectedChatModel,
      selectedVisibilityType,
      enabledToolkits,
    } = requestBody;

    // 🔍 LOG: Request sent to agent
    console.log('\n=== CHAT REQUEST ===');
    console.log('📨 Request sent to agent:', {
      chatId: id,
      messageId: message.id,
      messageContent: message.parts.map(part => part.type === 'text' ? part.text : `[${part.type}]`).join(' '),
      selectedModel: selectedChatModel,
      enabledToolkits: enabledToolkits?.map(t => t.slug) || [],
      timestamp: new Date().toISOString(),
    });

    const session = await auth();

    if (!session?.user) {
      return new ChatSDKError('unauthorized:chat').toResponse();
    }

    const userType: UserType = session.user.type;

    const messageCount = await getMessageCountByUserId({
      id: session.user.id,
      differenceInHours: 24,
    });

    if (messageCount > entitlementsByUserType[userType].maxMessagesPerDay) {
      return new ChatSDKError('rate_limit:chat').toResponse();
    }

    const chat = await getChatById({ id });

    if (!chat) {
      const title = await generateTitleFromUserMessage({
        message,
      });

      await saveChat({
        id,
        userId: session.user.id,
        title,
        visibility: selectedVisibilityType,
      });
    } else {
      if (chat.userId !== session.user.id) {
        return new ChatSDKError('forbidden:chat').toResponse();
      }
    }

    const previousMessages = await getMessagesByChatId({ id });

    const messages = appendClientMessage({
      // @ts-expect-error: todo add type conversion from DBMessage[] to UIMessage[]
      messages: previousMessages,
      message,
    });

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    await saveMessages({
      messages: [
        {
          chatId: id,
          id: message.id,
          role: 'user',
          parts: message.parts,
          attachments: message.experimental_attachments ?? [],
          createdAt: new Date(),
        },
      ],
    });

    const streamId = generateUUID();
    await createStreamId({ streamId, chatId: id });

    const stream = createDataStream({
      execute: async (dataStream) => {
        try {
          // Extract just the slugs for the toolkits
          const toolkitSlugs = enabledToolkits?.map((t) => t.slug) || [];

          // 🔍 LOG: Agent configuration
          console.log('\n=== LANGGRAPH AGENT SETUP ===');
          const agentConfig = getAgentConfig('react_agent');

          console.log('🤖 Creating LangGraph agent with:', {
            userId: session.user.id,
            toolkitSlugs,
            model: agentConfig.model,
            temperature: agentConfig.parameters.temperature,
            maxSteps: agentConfig.parameters.maxSteps,
            timestamp: new Date().toISOString(),
          });

          // Create LangGraph agent with Composio tools

          const { agent, maxSteps } = await createLangGraphAgent({
            userId: session.user.id,
            toolkitSlugs,
            systemPrompt: systemPrompt({ selectedChatModel, requestHints }),
            model: agentConfig.model,
            temperature: agentConfig.parameters.temperature,
            maxSteps: agentConfig.parameters.maxSteps,
          });

          // Convert Vercel messages to LangChain format
          const langchainMessages = convertVercelMessagesToLangChain(
            messages.filter((msg) => msg.role === 'user' || msg.role === 'assistant')
          );

          // 🔍 LOG: Messages being sent to agent
          console.log('\n=== MESSAGES TO AGENT ===');
          console.log('💬 LangChain messages:', langchainMessages.map(msg => ({
            type: msg._getType(),
            content: typeof msg.content === 'string' ? msg.content.substring(0, 200) + '...' : '[complex content]',
          })));

          // Stream the LangGraph agent execution
          const eventStream = await streamLangGraphAgent(agent, langchainMessages, maxSteps);

          // Process the stream and convert back to AI SDK format
          let finalResponse: any = null;
          let toolCallCount = 0;
          console.log('\n=== AGENT EXECUTION STREAM ===');
          const activeChains: Array<{ name: string; startedAt: number }> = [];

          for await (const { event, data } of eventStream) {
            // 🔍 LOG: Stream events
            if (event === 'on_tool_start') {
              toolCallCount++;
              console.log(`🔧 Tool Call #${toolCallCount} START:`, {
                toolName: data.name || data.toolName || 'unknown-tool',
                input: data.input,
                timestamp: new Date().toISOString(),
              });
            } else if (event === 'on_tool_end') {
              console.log(`✅ Tool Call #${toolCallCount} END:`, {
                toolName: data.name || data.toolName || 'unknown-tool',
                output: typeof data.output === 'string' ?
                  data.output.substring(0, 500) + (data.output.length > 500 ? '...' : '') :
                  data.output,
                timestamp: new Date().toISOString(),
              });
            } else if (event === 'on_chain_start') {
              const chainName = data.name || data.chain?.name || 'anonymous-chain';
              const startTime = Date.now();
              activeChains.push({ name: chainName, startedAt: startTime });

              console.log(`🧵 Chain START (${activeChains.length} active):`, {
                chainName,
                inputKeys: Array.isArray(data.inputs)
                  ? data.inputs.map((input: { key: string }) => input.key)
                  : Object.keys(data.inputs || {}),
                timestamp: new Date(startTime).toISOString(),
              });
            } else if (event === 'on_chat_model_stream') {
              // Stream content from the chat model
              if (data.chunk?.content) {
                dataStream.writeData({
                  type: 'text-delta',
                  textDelta: data.chunk.content,
                });
              }
            } 

            if (event === 'on_chain_end') {
              const chainName = data.name || data.chain?.name || 'anonymous-chain';
              const endTime = Date.now();
              const chainContext = activeChains.pop();

              if (data.output?.messages) {
                finalResponse = data.output;
              }

              console.log('🏁 Chain execution completed:', {
                chainName,
                messageCount: data.output?.messages?.length || 0,
                durationMs:
                  chainContext?.startedAt !== undefined
                    ? endTime - chainContext.startedAt
                    : undefined,
                outputPreview: data.output?.messages?.map((msg: any) =>
                  typeof msg.content === 'string'
                    ? `${msg.content.slice(0, 120)}${msg.content.length > 120 ? '...' : ''}`
                    : '[non-string content]',
                ),
                timestamp: new Date(endTime).toISOString(),
              });
            }
          }

          // Save the final response to database
          if (finalResponse?.messages && session.user?.id) {
            try {
              const lastMessage = finalResponse.messages[finalResponse.messages.length - 1];
              if (lastMessage && lastMessage._getType() === 'ai') {
                const assistantId = generateUUID();
                const vercelMessage = convertLangChainMessageToVercelMessage(lastMessage);

                // 🔍 LOG: Final agent response
                console.log('\n=== AGENT RESPONSE ===');
                console.log('🤖 Response from agent:', {
                  messageId: assistantId,
                  content: vercelMessage.content.substring(0, 500) + (vercelMessage.content.length > 500 ? '...' : ''),
                  contentLength: vercelMessage.content.length,
                  timestamp: new Date().toISOString(),
                });

                await saveMessages({
                  messages: [
                    {
                      id: assistantId,
                      chatId: id,
                      role: 'assistant',
                      parts: [{ type: 'text', text: vercelMessage.content }],
                      attachments: [],
                      createdAt: new Date(),
                    },
                  ],
                });

                console.log('✅ Agent response saved to database');
              }
            } catch (error) {
              console.error('❌ Failed to save LangGraph response:', error);
            }
          }

        } catch (error) {
          console.error('❌ LangGraph execution error:', error);
          
          // Fallback to original AI SDK implementation
          console.log('\n=== FALLBACK TO AI SDK ===');
          console.log('🔄 Falling back to original AI SDK implementation...');
          
          const toolkitSlugs = enabledToolkits?.map((t) => t.slug) || [];
          const composioTools = await getComposioTools(session.user.id, toolkitSlugs);

          console.log('🛠️ AI SDK tools available:', {
            weatherTool: 'getWeather',
            composioTools: Object.keys(composioTools),
            timestamp: new Date().toISOString(),
          });

          const result = streamText({
            model: myProvider.languageModel(selectedChatModel),
            system: systemPrompt({ selectedChatModel, requestHints }),
            messages,
            maxSteps: 5,
            experimental_transform: smoothStream({ chunking: 'word' }),
            experimental_generateMessageId: generateUUID,
            tools: {
              getWeather,
              ...composioTools,
            },
            onFinish: async ({ response }) => {
              if (session.user?.id) {
                try {
                  const assistantId = getTrailingMessageId({
                    messages: response.messages.filter(
                      (message) => message.role === 'assistant',
                    ),
                  });

                  if (!assistantId) {
                    throw new Error('No assistant message found!');
                  }

                  const [, assistantMessage] = appendResponseMessages({
                    messages: [message],
                    responseMessages: response.messages,
                  });

                  // 🔍 LOG: AI SDK response
                  console.log('\n=== AI SDK RESPONSE ===');
                  console.log('🤖 Response from AI SDK:', {
                    messageId: assistantId,
                    role: assistantMessage.role,
                    partsCount: assistantMessage.parts?.length || 0,
                    content: assistantMessage.parts
                      ?.filter(part => part.type === 'text')
                      ?.map(part => part.text?.substring(0, 200) + '...')
                      ?.join(' ') || '[no text content]',
                    toolCalls: response.messages
                      .filter(msg => msg.role === 'assistant' && 'toolInvocations' in msg)
                      .flatMap(msg => (msg as any).toolInvocations || [])
                      .map((tool: any) => ({
                        toolName: tool.toolName,
                        state: tool.state,
                      })),
                    timestamp: new Date().toISOString(),
                  });

                  await saveMessages({
                    messages: [
                      {
                        id: assistantId,
                        chatId: id,
                        role: assistantMessage.role,
                        parts: assistantMessage.parts,
                        attachments:
                          assistantMessage.experimental_attachments ?? [],
                        createdAt: new Date(),
                      },
                    ],
                  });

                  console.log('✅ AI SDK response saved to database');
                } catch (error) {
                  console.error('❌ Failed to save AI SDK chat:', error);
                }
              }
            },
            experimental_telemetry: {
              isEnabled: isProductionEnvironment,
              functionId: 'stream-text',
            },
          });

          result.consumeStream();
          result.mergeIntoDataStream(dataStream, {
            sendReasoning: true,
          });
        }
      },
      onError: () => {
        return 'Oops, an error occurred!';
      },
    });

    const streamContext = getStreamContext();

    if (streamContext) {
      return new Response(
        await streamContext.resumableStream(streamId, () => stream),
      );
    } else {
      return new Response(stream);
    }
  } catch (error) {
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
  }
}

export async function GET(request: Request) {
  const streamContext = getStreamContext();
  const resumeRequestedAt = new Date();

  if (!streamContext) {
    return new Response(null, { status: 204 });
  }

  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get('chatId');

  if (!chatId) {
    return new ChatSDKError('bad_request:api').toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError('unauthorized:chat').toResponse();
  }

  let chat: Chat;

  try {
    chat = await getChatById({ id: chatId });
  } catch {
    return new ChatSDKError('not_found:chat').toResponse();
  }

  if (!chat) {
    return new ChatSDKError('not_found:chat').toResponse();
  }

  if (chat.visibility === 'private' && chat.userId !== session.user.id) {
    return new ChatSDKError('forbidden:chat').toResponse();
  }

  const streamIds = await getStreamIdsByChatId({ chatId });

  if (!streamIds.length) {
    return new ChatSDKError('not_found:stream').toResponse();
  }

  const recentStreamId = streamIds.at(-1);

  if (!recentStreamId) {
    return new ChatSDKError('not_found:stream').toResponse();
  }

  const emptyDataStream = createDataStream({
    execute: () => {},
  });

  const stream = await streamContext.resumableStream(
    recentStreamId,
    () => emptyDataStream,
  );

  /*
   * For when the generation is streaming during SSR
   * but the resumable stream has concluded at this point.
   */
  if (!stream) {
    const messages = await getMessagesByChatId({ id: chatId });
    const mostRecentMessage = messages.at(-1);

    if (!mostRecentMessage) {
      return new Response(emptyDataStream, { status: 200 });
    }

    if (mostRecentMessage.role !== 'assistant') {
      return new Response(emptyDataStream, { status: 200 });
    }

    const messageCreatedAt = new Date(mostRecentMessage.createdAt);

    if (differenceInSeconds(resumeRequestedAt, messageCreatedAt) > 15) {
      return new Response(emptyDataStream, { status: 200 });
    }

    const restoredStream = createDataStream({
      execute: (buffer) => {
        buffer.writeData({
          type: 'append-message',
          message: JSON.stringify(mostRecentMessage),
        });
      },
    });

    return new Response(restoredStream, { status: 200 });
  }

  return new Response(stream, { status: 200 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new ChatSDKError('bad_request:api').toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError('unauthorized:chat').toResponse();
  }

  const chat = await getChatById({ id });

  if (chat.userId !== session.user.id) {
    return new ChatSDKError('forbidden:chat').toResponse();
  }

  const deletedChat = await deleteChatById({ id });

  return Response.json(deletedChat, { status: 200 });
}

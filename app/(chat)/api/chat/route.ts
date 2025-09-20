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
import { getWeatherTool } from '@/lib/ai/tools/get-weather';
import { isProductionEnvironment } from '@/lib/constants';
import { entitlementsByUserType } from '@/lib/ai/entitlements';
import { postRequestBodySchema, type PostRequestBody } from './schema';
import { geolocation } from '@vercel/functions';
import { after } from 'next/server';
import type { Chat } from '@/lib/db/schema';
import { differenceInSeconds } from 'date-fns';
import { ChatSDKError } from '@/lib/errors';
import { getComposioTools } from '@/lib/ai/tools/composio';
import { 
  createReActAgent, 
  convertToLangChainMessages, 
  convertFromLangChainMessages 
} from '@/lib/ai/agent';
import { createModelById } from '@/lib/ai/providers';
import { HumanMessage, AIMessage, AIMessageChunk } from '@langchain/core/messages';

export const maxDuration = 60;

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

    // Convert to LangChain format
    const langchainMessages = convertToLangChainMessages([
      ...previousMessages,
      message,
    ]);

    const { longitude, latitude, city, country } = geolocation(request);

    const requestHints: RequestHints = {
      longitude,
      latitude,
      city,
      country,
    };

    // Save user message
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

    // Prepare tools
    const toolkitSlugs = enabledToolkits?.map((t) => t.slug) || [];
    const composioTools = await getComposioTools(session.user.id, toolkitSlugs);
    const allTools = [getWeatherTool, ...composioTools];

    // Create ReAct agent
    const agent = createReActAgent({
      modelId: selectedChatModel,
      requestHints,
      tools: allTools,
      maxSteps: 5,
    });

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullContent = '';
          let assistantId = generateUUID();
          let hasStreamedContent = false;
          
          console.log('Starting agent stream with messages:', langchainMessages.length);
          
          // Stream the agent response
          const agentStream = await agent.stream(langchainMessages);
          
          for await (const chunk of agentStream) {
            console.log('Received chunk:', Object.keys(chunk));
            console.log('Full chunk structure:', JSON.stringify(chunk, null, 2));
            
            // Handle different types of chunks from LangGraph
            if (chunk.agent && chunk.agent.messages) {
              const messages = chunk.agent.messages;
              const lastMessage = messages[messages.length - 1];
              
              console.log('Agent message type:', lastMessage.constructor.name);
              console.log('Agent message content:', lastMessage.content);
              console.log('Agent message content type:', typeof lastMessage.content);
              console.log('Agent message content length:', lastMessage.content?.length);
              console.log('Is AIMessage?', lastMessage instanceof AIMessage);
              console.log('Has content?', !!lastMessage.content);
              
              if ((lastMessage instanceof AIMessage || lastMessage instanceof AIMessageChunk) && lastMessage.content) {
                const newContent = lastMessage.content as string;
                console.log('Processing content. Current length:', fullContent.length, 'New length:', newContent.length);
                console.log('Full content so far:', JSON.stringify(fullContent));
                console.log('New content:', JSON.stringify(newContent));
                
                // For streaming, we want to capture ALL content that comes through
                if (newContent && newContent.length > 0) {
                  console.log('Content check - fullContent:', JSON.stringify(fullContent));
                  console.log('Content check - newContent:', JSON.stringify(newContent));
                  console.log('Content check - are they equal?', newContent === fullContent);
                  
                  // Always process content if we have it
                  let delta = '';
                  
                  if (!fullContent) {
                    // First content - use it all as delta
                    delta = newContent;
                    fullContent = newContent;
                    console.log('First content detected');
                  } else if (newContent.length > fullContent.length && newContent.startsWith(fullContent)) {
                    // Content is growing - extract the delta
                    delta = newContent.slice(fullContent.length);
                    fullContent = newContent;
                    console.log('Growing content detected');
                  } else if (newContent !== fullContent) {
                    // Content is completely different - use it as delta
                    delta = newContent;
                    fullContent = newContent;
                    console.log('Different content detected');
                  }
                  
                  if (delta) {
                    hasStreamedContent = true;
                    console.log('Setting hasStreamedContent to true');
                    console.log('Sending delta:', JSON.stringify(delta));
                    
                    const data = {
                      type: 'text-delta',
                      textDelta: delta,
                    };
                    
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
                    );
                  } else {
                    console.log('No delta to send - content unchanged');
                  }
                }
              }
            }
            
            if (chunk.tools) {
              console.log('Tool execution:', chunk.tools);
              // Handle tool execution
              const data = {
                type: 'tool-call',
                toolCall: chunk.tools,
              };
              
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
              );
            }
          }

          console.log('Final content:', fullContent);
          console.log('Has streamed content:', hasStreamedContent);

          // If we have content from streaming, save and finish
          if (fullContent && hasStreamedContent) {
            await saveMessages({
              messages: [
                {
                  id: assistantId,
                  chatId: id,
                  role: 'assistant',
                  parts: [{ type: 'text', text: fullContent }],
                  attachments: [],
                  createdAt: new Date(),
                },
              ],
            });

            // Send final message
            const data = {
              type: 'finish',
              message: {
                id: assistantId,
                role: 'assistant',
                content: fullContent,
                createdAt: new Date(),
              },
            };
            
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
            );
          } else {
            console.error('No content received from streaming, trying invoke fallback');
            // Fallback: try to get response using invoke
            const fallbackResult = await agent.invoke(langchainMessages);
            const lastMessage = fallbackResult[fallbackResult.length - 1];
            
            if (lastMessage instanceof AIMessage && lastMessage.content) {
              const content = lastMessage.content as string;
              console.log('Fallback content:', content);
              
              await saveMessages({
                messages: [
                  {
                    id: assistantId,
                    chatId: id,
                    role: 'assistant',
                    parts: [{ type: 'text', text: content }],
                    attachments: [],
                    createdAt: new Date(),
                  },
                ],
              });

              // Send the content as text-delta first
              const data = {
                type: 'text-delta',
                textDelta: content,
              };
              
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
              );

              // Then send finish message
              const finishData = {
                type: 'finish',
                message: {
                  id: assistantId,
                  role: 'assistant',
                  content: content,
                  createdAt: new Date(),
                },
              };
              
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(finishData)}\n\n`)
              );
            } else {
              console.error('No content from fallback either');
              const errorData = {
                type: 'error',
                error: 'No response received from the agent.',
              };
              
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`)
              );
            }
          }

          controller.close();
        } catch (error) {
          console.error('Error in chat stream:', error);
          const errorData = {
            type: 'error',
            error: 'An error occurred while processing your request.',
          };
          
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
    
    console.error('Unexpected error in chat route:', error);
    return new ChatSDKError('offline:chat').toResponse();
  }
}

export async function GET(request: Request) {
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

  const messages = await getMessagesByChatId({ id: chatId });
  const mostRecentMessage = messages.at(-1);

  if (!mostRecentMessage || mostRecentMessage.role !== 'assistant') {
    return new Response(JSON.stringify({ messages }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ messages }), {
    headers: { 'Content-Type': 'application/json' },
  });
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

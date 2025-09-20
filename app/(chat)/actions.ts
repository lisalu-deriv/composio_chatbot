'use server';

import { cookies } from 'next/headers';
import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
} from '@/lib/db/queries';
import type { VisibilityType } from '@/components/visibility-selector';
import { createModelById, getDefaultTitleModel } from '@/lib/ai/providers';
import { HumanMessage } from '@langchain/core/messages';

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('chat-model', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: any; // UIMessage type from the old system
}) {
  try {
    // Get the default title model
    const titleModelId = getDefaultTitleModel();
    const model = createModelById(titleModelId);

    // Create the system prompt
    const systemPrompt = `You will generate a short title based on the first message a user begins a conversation with.
- Ensure it is not more than 80 characters long
- The title should be a summary of the user's message
- Do not use quotes or colons
- Be concise and descriptive`;

    // Extract the message content
    const messageContent = message.content || message.parts?.[0]?.text || JSON.stringify(message);

    // Create messages for the model
    const messages = [
      new HumanMessage({
        content: `${systemPrompt}\n\nUser message: ${messageContent}\n\nGenerate a title:`
      })
    ];

    // Generate the title
    const response = await model.invoke(messages);
    const title = response.content as string;

    // Clean up the title (remove quotes, trim, etc.)
    return title.replace(/['"]/g, '').trim().substring(0, 80);
  } catch (error) {
    console.error('Error generating title:', error);
    // Fallback to a simple title based on message content
    const messageContent = message.content || message.parts?.[0]?.text || 'New Chat';
    return messageContent.substring(0, 50) + (messageContent.length > 50 ? '...' : '');
  }
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}

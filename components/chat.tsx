'use client';

import { useEffect, useState, useRef } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { ChatHeader } from '@/components/chat-header';
import type { Vote } from '@/lib/db/schema';
import { fetcher, fetchWithErrorHandlers, generateUUID } from '@/lib/utils';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import type { VisibilityType } from './visibility-selector';
import { unstable_serialize } from 'swr/infinite';
import { getChatHistoryPaginationKey } from './sidebar-history';
import { toast } from './toast';
import type { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { useChatVisibility } from '@/hooks/use-chat-visibility';
import { useAutoResume } from '@/hooks/use-auto-resume';
import { ChatSDKError } from '@/lib/errors';
import { useToolbarState } from './toolbar';

// Define types that were previously from AI SDK
export interface UIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: Date;
  parts?: Array<{ type: 'text'; text: string }>;
  experimental_attachments?: Array<Attachment>;
}

export interface Attachment {
  url: string;
  name: string;
  contentType: string;
}

type ChatStatus = 'idle' | 'loading' | 'streaming' | 'error' | 'submitted';

export function Chat({
  id,
  initialMessages,
  initialChatModel,
  initialVisibilityType,
  isReadonly,
  session,
  autoResume,
}: {
  id: string;
  initialMessages: Array<UIMessage>;
  initialChatModel: string;
  initialVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
  autoResume: boolean;
}) {
  const { mutate } = useSWRConfig();
  const { state: toolbarState } = useToolbarState();

  // Create a ref to always have the latest toolbar state
  const toolbarStateRef = useRef(toolbarState);
  useEffect(() => {
    toolbarStateRef.current = toolbarState;
  }, [toolbarState]);

  const { visibilityType } = useChatVisibility({
    chatId: id,
    initialVisibilityType,
  });

  // State management for chat
  const [messages, setMessages] = useState<UIMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  // Custom chat implementation
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim() || status === 'loading' || status === 'streaming') {
      return;
    }

    const userMessage: UIMessage = {
      id: generateUUID(),
      role: 'user',
      content: input,
      createdAt: new Date(),
      parts: [{ type: 'text', text: input }],
      experimental_attachments: attachments.length > 0 ? attachments : undefined,
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachments([]);
    setStatus('loading');

    try {
      // Prepare request body
      const currentToolbarState = toolbarStateRef.current;
      const enabledToolkits = Array.from(
        currentToolbarState.enabledToolkitsWithStatus.entries(),
      ).map(([slug, isConnected]) => ({ slug, isConnected }));

      const requestBody = {
        id,
        message: userMessage,
        selectedChatModel: initialChatModel,
        selectedVisibilityType: visibilityType,
        enabledToolkits,
      };

      // Make request to chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus('streaming');

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage: UIMessage = {
        id: generateUUID(),
        role: 'assistant',
        content: '',
        createdAt: new Date(),
      };

      // Add assistant message placeholder
      setMessages(prev => [...prev, assistantMessage]);

      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));
                  
                  if (data.type === 'text-delta') {
                    assistantMessage.content += data.textDelta;
                    setMessages(prev =>
                      prev.map(msg =>
                        msg.id === assistantMessage.id
                          ? { ...msg, content: assistantMessage.content }
                          : msg
                      )
                    );
                  } else if (data.type === 'finish') {
                    // Update with final message
                    setMessages(prev =>
                      prev.map(msg =>
                        msg.id === assistantMessage.id
                          ? { ...data.message, id: assistantMessage.id }
                          : msg
                      )
                    );
                  } else if (data.type === 'error') {
                    throw new Error(data.error);
                  }
                } catch (parseError) {
                  console.warn('Failed to parse streaming data:', parseError);
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
      }

      setStatus('idle');
      mutate(unstable_serialize(getChatHistoryPaginationKey));
    } catch (error) {
      console.error('Chat error:', error);
      setStatus('error');
      
      if (error instanceof ChatSDKError) {
        toast({
          type: 'error',
          description: error.message,
        });
      } else {
        toast({
          type: 'error',
          description: 'An error occurred while sending your message.',
        });
      }
    }
  };

  const append = (message: Partial<UIMessage>) => {
    const fullMessage: UIMessage = {
      id: generateUUID(),
      role: 'user',
      content: '',
      createdAt: new Date(),
      ...message,
    };
    setMessages(prev => [...prev, fullMessage]);
  };

  const stop = () => {
    setStatus('idle');
  };

  const reload = () => {
    // Implement reload functionality if needed
    console.log('Reload not implemented yet');
  };

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [hasAppendedQuery, setHasAppendedQuery] = useState(false);

  useEffect(() => {
    if (query && !hasAppendedQuery) {
      append({
        role: 'user',
        content: query,
      });

      setHasAppendedQuery(true);
      window.history.replaceState({}, '', `/chat/${id}`);
    }
  }, [query, hasAppendedQuery, id]);

  const { data: votes } = useSWR<Array<Vote>>(
    messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
    fetcher,
  );

  // Auto-resume functionality (simplified)
  useEffect(() => {
    if (autoResume && initialMessages.length > 0) {
      // Implement auto-resume logic if needed
    }
  }, [autoResume, initialMessages]);

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          selectedModelId={initialChatModel}
          selectedVisibilityType={initialVisibilityType}
          isReadonly={isReadonly}
          session={session}
        />

        <Messages
          chatId={id}
          status={status}
          votes={votes}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl" onSubmit={handleSubmit}>
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              status={status}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              append={append}
              selectedVisibilityType={visibilityType}
            />
          )}
        </form>
      </div>
    </>
  );
}

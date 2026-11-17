'use client';

import { Spinner } from '@/components/ui/Spinner';
import { ChatComposer } from '@/features/chat/components/ChatComposer';
import { EmptyChatState } from '@/features/chat/components/EmptyChatState';
import { MessageList } from '@/features/chat/components/MessageList';
import { useConversationMessages } from '@/features/chat/hooks/useConversationMessages';
import { DocumentsPanel } from '@/features/documents/components/DocumentPanel';

export function ChatWorkspace({ conversationId }: { conversationId?: string }) {
  const { messages, isAwaitingReply, isLoading, errorMessage } =
    useConversationMessages(conversationId);

  return (
    <div className='flex h-full'>
      <section className='flex min-w-0 flex-1 flex-col bg-slate-50'>
        {isLoading ? (
          <div className='flex flex-1 items-center justify-center'>
            <Spinner className='h-6 w-6 text-indigo-600' />
          </div>
        ) : errorMessage ? (
          <p className='flex-1 p-6 text-center text-sm text-red-600'>
            {errorMessage}
          </p>
        ) : messages.length === 0 && !isAwaitingReply ? (
          <EmptyChatState />
        ) : (
          <MessageList messages={messages} isAwaitingReply={isAwaitingReply} />
        )}
        <ChatComposer conversationId={conversationId} />
      </section>
      <DocumentsPanel conversationId={conversationId} />
    </div>
  );
}

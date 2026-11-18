'use client';

import { useEffect, useRef } from 'react';
import { Spinner } from '@/components/ui/Spinner';
import { MessageBubble } from '@/features/chat/components/MessageBubble';
import type { Message } from '@/features/chat/chat.schema';

interface MessageListProps {
  messages: Message[];
  isAwaitingReply: boolean;
}

export function MessageList({ messages, isAwaitingReply }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isAwaitingReply]);

  return (
    <div className='flex-1 space-y-4 overflow-y-auto p-6'>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isAwaitingReply && (
        <div
          className='flex items-center gap-2 text-sm text-slate-500'
          role='status'
        >
          <Spinner /> Searching your documents…
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

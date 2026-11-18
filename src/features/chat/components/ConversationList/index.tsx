'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { useConversations } from '@/features/chat/hooks/useConversations';

export function ConversationList() {
  const pathname = usePathname();
  const { conversations, isLoading } = useConversations();

  if (isLoading && conversations.length === 0) {
    return (
      <div className='space-y-2 px-3' aria-label='Loading chat history'>
        {[0, 1, 2].map((placeholder) => (
          <div
            key={placeholder}
            className='h-7 animate-pulse rounded bg-slate-100'
          />
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return <p className='px-3 text-xs text-slate-400'>No chats yet.</p>;
  }

  return (
    <ul className='space-y-0.5'>
      {conversations.map((conversation) => {
        const href = `/chat/${conversation.id}`;
        return (
          <li key={conversation.id}>
            <Link
              href={href}
              title={conversation.title}
              className={cn(
                'block truncate rounded-lg px-3 py-1.5 text-sm',
                pathname === href
                  ? 'bg-slate-100 font-medium text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50',
              )}
            >
              {conversation.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

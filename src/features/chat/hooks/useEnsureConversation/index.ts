'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { chatApi } from '@/features/chat/chat.api';
import { useChatStore } from '@/features/chat/chat.store';
import { useDocumentsStore } from '@/features/documents/document.store';

/**
 * On /chat there is no conversation yet. The first send or upload creates one,
 * seeds the stores (so the new page doesn't refetch), and moves the URL to /chat/:id.
 */
export function useEnsureConversation(conversationId?: string) {
  const router = useRouter();

  return useCallback(
    async (titleHint?: string): Promise<string> => {
      if (conversationId) return conversationId;

      const created = await chatApi.createConversation(titleHint);
      useChatStore.getState().addConversation(created);
      useChatStore.getState().setMessages(created.id, []);
      useDocumentsStore.getState().setDocuments(created.id, []);
      router.replace(`/chat/${created.id}`);
      return created.id;
    },
    [conversationId, router],
  );
}

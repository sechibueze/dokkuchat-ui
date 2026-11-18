'use client';

import { useEffect, useState } from 'react';
import { chatApi } from '@/features/chat/chat.api';
import { useChatStore } from '@/features/chat/chat.store';

export function useConversations() {
  const conversations = useChatStore((state) => state.conversations);
  const setConversations = useChatStore((state) => state.setConversations);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    chatApi
      .listConversations()
      .then((loaded) => !isCancelled && setConversations(loaded))
      .catch(() => undefined)
      .finally(() => !isCancelled && setIsLoading(false));
    return () => {
      isCancelled = true;
    };
  }, [setConversations]);

  return { conversations, isLoading };
}

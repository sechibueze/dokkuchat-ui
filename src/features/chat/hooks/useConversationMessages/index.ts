'use client';

import { useEffect, useState } from 'react';
import { chatApi } from '@/features/chat/chat.api';
import type { Message } from '@/features/chat/chat.schema';
import { useChatStore } from '@/features/chat/chat.store';
import { getErrorMessage } from '@/lib/errors';

const EMPTY_MESSAGES: Message[] = [];

export function useConversationMessages(conversationId?: string) {
  const messages = useChatStore(
    (state) =>
      (conversationId
        ? state.messagesByConversation[conversationId]
        : undefined) ?? EMPTY_MESSAGES,
  );
  const isAwaitingReply = useChatStore((state) =>
    conversationId
      ? Boolean(state.awaitingReplyByConversation[conversationId])
      : false,
  );
  const setMessages = useChatStore((state) => state.setMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cache-first: only hit the API when this conversation has never been loaded.
  useEffect(() => {
    if (!conversationId) return;
    if (useChatStore.getState().messagesByConversation[conversationId]) return;

    let isCancelled = false;
    setIsLoading(true);
    chatApi
      .listMessages(conversationId)
      .then((loaded) => !isCancelled && setMessages(conversationId, loaded))
      .catch((error) => !isCancelled && setErrorMessage(getErrorMessage(error)))
      .finally(() => !isCancelled && setIsLoading(false));

    return () => {
      isCancelled = true;
    };
  }, [conversationId, setMessages]);

  return { messages, isAwaitingReply, isLoading, errorMessage };
}

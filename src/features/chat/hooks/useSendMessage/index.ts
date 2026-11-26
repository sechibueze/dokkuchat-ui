"use client";

import { useState } from "react";
import { chatApi } from "@/features/chat/chat.api";
import { useChatStore } from "@/features/chat/chat.store";
import { getErrorMessage } from "@/lib/errors";
import { isRateLimitActive } from "@/features/auth/rate-limit.store";
import { RateLimitError } from "@/lib/api-client";

const TITLE_MAX_LENGTH = 60;

export function useSendMessage(
  resolveConversationId: (titleHint?: string) => Promise<string>,
) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /** Resolves to true when the message was delivered, so the caller can restore the draft otherwise. */
  const sendMessage = async (content: string): Promise<boolean> => {
    setErrorMessage(null);
    if (isRateLimitActive()) return false; // no request, no spinner; the banner explains why

    const { appendMessage, removeMessage, setAwaitingReply } =
      useChatStore.getState();
    let conversationId: string | null = null;
    let optimisticMessageId: string | null = null;

    try {
      conversationId = await resolveConversationId(
        content.slice(0, TITLE_MAX_LENGTH),
      );

      optimisticMessageId = crypto.randomUUID();
      appendMessage(conversationId, {
        id: optimisticMessageId,
        role: "user",
        content,
        citations: [],
        createdAt: new Date().toISOString(),
      });
      setAwaitingReply(conversationId, true);

      const modelId = useChatStore.getState().selectedModelId ?? undefined;
      const res = await chatApi.sendMessage(conversationId, {
        content,
        modelId,
      });

      console.log(res);
      const assistantMessage = res.data.assistantMessage;
      appendMessage(conversationId, {
        id: optimisticMessageId,
        role: assistantMessage.role.toLowerCase() as "assistant",
        content: assistantMessage.content,
        citations: [],
        createdAt: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      if (conversationId && optimisticMessageId)
        removeMessage(conversationId, optimisticMessageId);
      // The global banner already explains rate limits, so don't duplicate it as an error.
      if (!(error instanceof RateLimitError))
        setErrorMessage(getErrorMessage(error));
      return false;
    } finally {
      if (conversationId) setAwaitingReply(conversationId, false);
    }
  };

  return { sendMessage, errorMessage };
}

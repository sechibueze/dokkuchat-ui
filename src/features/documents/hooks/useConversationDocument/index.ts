"use client";

import { useEffect, useState } from "react";
import { documentsApi } from "@/features/documents/document.api";
import type { DocumentItem } from "@/features/documents/document.schema";
import { useDocumentsStore } from "@/features/documents/document.store";
import { isRateLimitActive } from "@/features/auth/rate-limit.store";

const EMPTY_DOCUMENTS: DocumentItem[] = [];
const POLL_INTERVAL_MS = 4000;

export function useConversationDocuments(conversationId?: string) {
  const documents = useDocumentsStore(
    (state) =>
      (conversationId
        ? state.documentsByConversation[conversationId]
        : undefined) ?? EMPTY_DOCUMENTS,
  );
  const setDocuments = useDocumentsStore((state) => state.setDocuments);
  const [isLoading, setIsLoading] = useState(false);

  // Load once per conversation (cache-first).
  useEffect(() => {
    if (!conversationId) return;
    if (useDocumentsStore.getState().documentsByConversation[conversationId])
      return;

    let isCancelled = false;
    setIsLoading(true);
    documentsApi
      .listForConversation(conversationId)
      .then(
        (loaded) => !isCancelled && setDocuments(conversationId, loaded.data),
      )
      .catch(() => undefined)
      .finally(() => !isCancelled && setIsLoading(false));

    return () => {
      isCancelled = true;
    };
  }, [conversationId, setDocuments]);

  // Ingestion is asynchronous, so poll while any document is still being processed.
  const hasPendingDocuments = documents.some(
    (document) =>
      document.status === "uploaded" || document.status === "processing",
  );

  useEffect(() => {
    if (isRateLimitActive()) return;
    if (!conversationId || !hasPendingDocuments) return;
    const timer = setInterval(() => {
      documentsApi
        .listForConversation(conversationId)
        .then((loaded) =>
          setDocuments(conversationId, loaded.data as DocumentItem[]),
        )
        .catch(() => undefined);
    }, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [conversationId, hasPendingDocuments, setDocuments]);

  return { documents, isLoading };
}

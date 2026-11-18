'use client';

import { useState } from 'react';
import { documentsApi } from '@/features/documents/document.api';
import type {
  DocumentItem,
  PasteTextInput,
} from '@/features/documents/document.schema';
import { useDocumentsStore } from '@/features/documents/document.store';
import { validateUploadFile } from '@/features/documents/document.util';
import { getErrorMessage } from '@/lib/errors';
import { isRateLimitActive } from '@/features/auth/rate-limit.store';
import { RateLimitError } from '@/lib/api-client';

export function useDocumentUploads(
  resolveConversationId: () => Promise<string>,
) {
  const addDocument = useDocumentsStore((state) => state.addDocument);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const runUpload = async (task: (conversationId: string) => Promise<void>) => {
    setUploadError(null);
    if (isRateLimitActive()) return;

    setIsUploading(true);
    try {
      await task(await resolveConversationId());
    } catch (error) {
      if (!(error instanceof RateLimitError))
        setUploadError(getErrorMessage(error));
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFiles = async (files: File[]) => {
    const validationError = files
      .map(validateUploadFile)
      .find((message) => message !== null);
    if (validationError) {
      setUploadError(validationError);
      return;
    }
    await runUpload(async (conversationId) => {
      for (const file of files) {
        addDocument(
          conversationId,
          (await documentsApi.upload(conversationId, file)) as DocumentItem,
        );
      }
    });
  };

  const addPastedText = (input: PasteTextInput) =>
    runUpload(async (conversationId) => {
      addDocument(
        conversationId,
        (await documentsApi.createFromText(
          conversationId,
          input,
        )) as DocumentItem,
      );
    });

  return { uploadFiles, addPastedText, isUploading, uploadError };
}

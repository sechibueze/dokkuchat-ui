'use client';

import { useEffect } from 'react';
import { chatApi } from '@/features/chat/chat.api';
import { useChatStore } from '@/features/chat/chat.store';

export function useChatModels() {
  const models = useChatStore((state) => state.models);
  const selectedModelId = useChatStore((state) => state.selectedModelId);
  const setModels = useChatStore((state) => state.setModels);
  const selectModel = useChatStore((state) => state.selectModel);

  useEffect(() => {
    if (useChatStore.getState().models.length > 0) return;
    chatApi
      .listModels()
      .then(setModels)
      .catch(() => undefined);
  }, [setModels]);

  return { models, selectedModelId, selectModel };
}

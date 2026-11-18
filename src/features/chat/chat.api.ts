import { z } from 'zod';
import { api } from '@/lib/api-client';
import {
  chatModelSchema,
  conversationSchema,
  messageSchema,
} from '@/features/chat/chat.schema';

export const chatApi = {
  listModels: () => api.get('/models', z.array(chatModelSchema)),
  listConversations: () =>
    api.get('/conversations', z.array(conversationSchema)),
  createConversation: (title?: string) =>
    api.post('/conversations', { title }, conversationSchema),
  listMessages: (conversationId: string) =>
    api.get(
      `/conversations/${conversationId}/messages`,
      z.array(messageSchema),
    ),
  sendMessage: (
    conversationId: string,
    input: { content: string; modelId?: string },
  ) =>
    api.post(`/conversations/${conversationId}/messages`, input, messageSchema),
};

import { api } from '@/lib/api-client';
import {
  documentSchema,
  type PasteTextInput,
} from '@/features/documents/document.schema';

export const documentsApi = {
  listForConversation: (conversationId: string) =>
    api.get(
      `/conversations/${conversationId}/documents`,
      //   z.array(documentSchema),
    ),

  upload: (conversationId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(
      `/conversations/${conversationId}/documents`,
      formData,
      //   documentSchema,
    );
  },

  createFromText: (conversationId: string, input: PasteTextInput) =>
    api.post(
      `/conversations/${conversationId}/documents/text`,
      input,
      //   documentSchema,
    ),

  remove: (documentId: string) => api.delete(`/documents/${documentId}`),
};

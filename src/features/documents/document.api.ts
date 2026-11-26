import { api } from "@/lib/api-client";
import {
  DocumentItem,
  documentSchema,
  type PasteTextInput,
} from "@/features/documents/document.schema";

export const documentsApi = {
  listForConversation: (conversationId: string) =>
    api.get<{ data: DocumentItem[] }>(
      `/documents`,
      //   z.array(documentSchema),
    ),

  upload: (conversationId: string, file: File) => {
    const formData = new FormData();
    formData.append("files", file);
    return api.post(
      `/documents`,
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

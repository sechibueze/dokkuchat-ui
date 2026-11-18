import { create } from 'zustand';
import type { DocumentItem } from '@/features/documents/document.schema';

interface DocumentsState {
  documentsByConversation: Record<string, DocumentItem[]>;
  setDocuments: (conversationId: string, documents: DocumentItem[]) => void;
  addDocument: (conversationId: string, document: DocumentItem) => void;
  removeDocument: (conversationId: string, documentId: string) => void;
  reset: () => void;
}

export const useDocumentsStore = create<DocumentsState>()((set) => ({
  documentsByConversation: {},
  setDocuments: (conversationId, documents) =>
    set((state) => ({
      documentsByConversation: {
        ...state.documentsByConversation,
        [conversationId]: documents,
      },
    })),
  addDocument: (conversationId, document) =>
    set((state) => ({
      documentsByConversation: {
        ...state.documentsByConversation,
        [conversationId]: [
          ...(state.documentsByConversation[conversationId] ?? []),
          document,
        ],
      },
    })),
  removeDocument: (conversationId, documentId) =>
    set((state) => ({
      documentsByConversation: {
        ...state.documentsByConversation,
        [conversationId]: (
          state.documentsByConversation[conversationId] ?? []
        ).filter((document) => document.id !== documentId),
      },
    })),
  reset: () => set({ documentsByConversation: {} }),
}));

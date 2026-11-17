import { create } from 'zustand';
import type {
  ChatModel,
  Conversation,
  Message,
} from '@/features/chat/chat.schema';

interface ChatState {
  conversations: Conversation[];
  messagesByConversation: Record<string, Message[]>;
  awaitingReplyByConversation: Record<string, boolean>;
  models: ChatModel[];
  selectedModelId: string | null;
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  appendMessage: (conversationId: string, message: Message) => void;
  setAwaitingReply: (conversationId: string, isAwaiting: boolean) => void;
  setModels: (models: ChatModel[]) => void;
  selectModel: (modelId: string) => void;
  reset: () => void;
  removeMessage: (conversationId: string, messageId: string) => void;
}

const initialState = {
  conversations: [],
  messagesByConversation: {},
  awaitingReplyByConversation: {},
  models: [{ id: 'default', name: 'Local Model', provider: 'ollama' }],
  selectedModelId: null,
};

export const useChatStore = create<ChatState>()((set) => ({
  ...initialState,
  setConversations: (conversations) => set({ conversations }),
  addConversation: (conversation) =>
    set((state) =>
      state.conversations.some((existing) => existing.id === conversation.id)
        ? state
        : { conversations: [conversation, ...state.conversations] },
    ),
  setMessages: (conversationId, messages) =>
    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: messages,
      },
    })),
  appendMessage: (conversationId, message) =>
    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: [
          ...(state.messagesByConversation[conversationId] ?? []),
          message,
        ],
      },
    })),
  setAwaitingReply: (conversationId, isAwaiting) =>
    set((state) => ({
      awaitingReplyByConversation: {
        ...state.awaitingReplyByConversation,
        [conversationId]: isAwaiting,
      },
    })),
  setModels: (models) =>
    set((state) => ({
      models,
      selectedModelId: state.selectedModelId ?? models[0]?.id ?? null,
    })),
  selectModel: (modelId) => set({ selectedModelId: modelId }),
  reset: () => set(initialState),
  removeMessage: (conversationId, messageId) =>
    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: (
          state.messagesByConversation[conversationId] ?? []
        ).filter((message) => message.id !== messageId),
      },
    })),
}));

import { z } from "zod";
import { api } from "@/lib/api-client";
import {
  chatModelSchema,
  Conversation,
  conversationSchema,
  Message,
  messageSchema,
} from "@/features/chat/chat.schema";

export const chatApi = {
  listModels: () =>
    api.get<{ data: z.infer<typeof chatModelSchema>[] }>(
      "/models", //z.array(chatModelSchema)
    ),
  listConversations: () =>
    api.get<{ data: Conversation[] }>(
      "/conversations", //z.array(conversationSchema)
    ),
  createConversation: (title?: string) =>
    api.post<{ data: { id: string; title: string } }>(
      "/conversations",
      { title }, //conversationSchema
    ),
  listMessages: (conversationId: string) =>
    api.get<{ data: Message[] }>(
      `/conversations/${conversationId}/messages`,
      // z.array(messageSchema),
    ),
  sendMessage: (
    conversationId: string,
    input: { content: string; modelId?: string },
  ) =>
    api.post<{
      data: {
        assistantMessage: {
          id: string;
          content: string;
          citations: {
            documentName: string;
          }[];
          role: "ASSISTANT";
        };
      };
    }>(
      `/conversations/${conversationId}/messages`,
      input, //messageSchema
    ),
};

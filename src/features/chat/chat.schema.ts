import { z } from "zod";

export const sourceSchema = z.object({
  documentId: z.string(),
  documentName: z.string(),
  pageNumber: z.int(),
  sourceNumber: z.int(),
});

export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  citations: z.array(sourceSchema).default([]),
  createdAt: z.string(),
});

export const conversationSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  updatedAt: z.string().optional(),
});

export const chatModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
});

export type Source = z.infer<typeof sourceSchema>;
export type Message = z.infer<typeof messageSchema>;
export type Conversation = z.infer<typeof conversationSchema>;
export type ChatModel = z.infer<typeof chatModelSchema>;

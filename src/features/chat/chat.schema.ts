import { z } from 'zod';

export const sourceSchema = z.object({
  documentId: z.string(),
  documentName: z.string(),
  snippet: z.string(),
});

export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  sources: z.array(sourceSchema).default([]),
  createdAt: z.string(),
});

export const conversationSchema = z.object({
  id: z.string(),
  title: z.string(),
  updatedAt: z.string(),
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

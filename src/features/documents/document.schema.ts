import { z } from 'zod';

export const documentStatusSchema = z.enum([
  'uploaded',
  'processing',
  'ready',
  'failed',
]);

export const documentSchema = z.object({
  id: z.string(),
  name: z.string(),
  mimeType: z.string(),
  sizeBytes: z.number(),
  status: documentStatusSchema,
  createdAt: z.string(),
});

export const pasteTextSchema = z.object({
  title: z.string().trim().min(1, 'Give the text a title').max(120),
  content: z.string().trim().min(20, 'Paste at least 20 characters'),
});

export type DocumentStatus = z.infer<typeof documentStatusSchema>;
export type DocumentItem = z.infer<typeof documentSchema>;
export type PasteTextInput = z.infer<typeof pasteTextSchema>;

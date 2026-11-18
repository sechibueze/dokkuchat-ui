import { email, z } from 'zod';
import { authUserSchema } from '@/features/auth/auth.schema';
import { documentSchema } from '@/features/documents/document.schema';

export const adminUserSchema = authUserSchema.extend({
  createdAt: z.string(),
  documentCount: z.number().default(0),
  email: z.email(),
});

export const adminDocumentSchema = documentSchema.extend({
  email: z.email(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;
export type AdminDocument = z.infer<typeof adminDocumentSchema>;

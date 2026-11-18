import { z } from 'zod';
import { api } from '@/lib/api-client';
import {
  adminDocumentSchema,
  adminUserSchema,
} from '@/features/admin/admin.schema';

export const adminApi = {
  listUsers: () => api.get('/admin/users', z.array(adminUserSchema)),
  listDocuments: () =>
    api.get('/admin/documents', z.array(adminDocumentSchema)),
};

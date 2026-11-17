import { api } from '@/lib/api-client';
import { usageSummarySchema } from '@/features/dashboard/dashboard.schema';

export const dashboardApi = {
  getUsageSummary: () => api.get('/usage/summary', usageSummarySchema),
};

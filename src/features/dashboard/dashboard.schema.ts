import { z } from 'zod';

export const usageSummarySchema = z.object({
  documentCount: z.number(),
  conversationCount: z.number(),
  tokensUsed: z.number(),
  budgetUsedPercent: z.number(),
});

export type UsageSummary = z.infer<typeof usageSummarySchema>;

import type { ZodType } from 'zod';

export type FieldErrors<TValues> = Partial<Record<keyof TValues, string>>;

export function validateForm<TValues extends Record<string, string>, TOutput>(
  schema: ZodType<TOutput>,
  values: TValues,
):
  | { success: true; data?: TOutput; errors: FieldErrors<TValues> }
  | { success: false; data?: TOutput; errors: FieldErrors<TValues> } {
  const result = schema.safeParse(values);
  if (result.success) return { success: true, data: result.data, errors: {} };

  const errors: FieldErrors<TValues> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof TValues | undefined;
    if (field !== undefined && !errors[field]) errors[field] = issue.message;
  }
  return { success: false, errors };
}

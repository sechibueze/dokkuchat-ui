import type { ZodType } from 'zod';
import { env } from '@/lib/env';
import { useAuthStore } from '@/features/auth/auth.store';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions<TResponse> extends Omit<RequestInit, 'body'> {
  body?: unknown;
  schema?: ZodType<TResponse>;
}

export async function apiRequest<TResponse>(
  path: string,
  { body, schema, headers, ...init }: RequestOptions<TResponse> = {},
): Promise<TResponse> {
  const accessToken = useAuthStore.getState().accessToken;
  const isFormData = body instanceof FormData;

  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      ...(body !== undefined && !isFormData
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    body:
      body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  });

  if (response.status === 401 && accessToken) {
    useAuthStore.getState().clearSession();
    if (typeof window !== 'undefined') window.location.href = '/login';
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null);

    console.error('API request failed', {
      path,
      status: response.status,
      statusText: response.statusText,
      payload,
    });
    throw new ApiError(
      payload?.error?.message ?? response.statusText,
      response.status,
      payload?.error?.details,
    );
  }

  if (response.status === 204) return undefined as TResponse;

  const json = await response.json();

  return schema ? schema.parse(json) : (json as TResponse);
}

export const api = {
  get: <T>(path: string, schema?: ZodType<T>) =>
    apiRequest<T>(path, { method: 'GET', schema }),
  post: <T>(path: string, body?: unknown, schema?: ZodType<T>) =>
    apiRequest<T>(path, { method: 'POST', body, schema }),
  delete: (path: string) => apiRequest<void>(path, { method: 'DELETE' }),
};

import type { ZodType } from 'zod';
import { env } from '@/lib/env';
import { useAuthStore } from '@/features/auth/auth.store';
import {
  formatRetryDelay,
  formatRetryTime,
  parseRetryAfterSeconds,
} from './rate-limit';
import { useRateLimitStore } from '@/features/auth/rate-limit.store';

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

export class RateLimitError extends ApiError {
  readonly retryAfterSeconds: number;
  readonly retryAt: number;

  constructor(retryAfterSeconds: number, details?: unknown) {
    const retryAt = Date.now() + retryAfterSeconds * 1000;
    super(
      `You've reached your limit. Please try again in ${formatRetryDelay(retryAfterSeconds)} (at ${formatRetryTime(retryAt)}).`,
      429,
      details,
    );
    this.name = 'RateLimitError';
    this.retryAfterSeconds = retryAfterSeconds;
    this.retryAt = retryAt;
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
  if (response.status === 429) {
    const payload = await response.json().catch(() => null);
    const rateLimitError = new RateLimitError(
      parseRetryAfterSeconds(response.headers, payload),
      payload,
    );
    useRateLimitStore.getState().startCooldown(rateLimitError.retryAt);
    throw rateLimitError;
  }
  console.log('API request', {
    path,
    method: init.method ?? 'GET',
    status: response.status,
    statusText: response.statusText,
    accessToken,
  });
  if (response.status === 401) {
    console.warn(
      'API request returned 401 Unauthorized, clearing session and redirecting to login.',
      {
        path,
        method: init.method ?? 'GET',
        status: response.status,
        statusText: response.statusText,
      },
    );
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

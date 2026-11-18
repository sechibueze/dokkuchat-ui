const DEFAULT_RETRY_AFTER_SECONDS = 60;

/**
 * Reads how long to wait from (in order): Retry-After (seconds or HTTP date),
 * RateLimit-Reset (seconds), the JSON body's retryAfterSeconds, then a default.
 */
export function parseRetryAfterSeconds(
  headers: Headers,
  body: unknown,
  now = Date.now(),
): number {
  const retryAfter = headers.get('Retry-After');
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds) && seconds >= 0) return Math.ceil(seconds);
    const retryDateMs = Date.parse(retryAfter);
    if (!Number.isNaN(retryDateMs))
      return Math.max(0, Math.ceil((retryDateMs - now) / 1000));
  }

  const rateLimitReset = Number(headers.get('RateLimit-Reset'));
  if (
    headers.get('RateLimit-Reset') &&
    Number.isFinite(rateLimitReset) &&
    rateLimitReset >= 0
  ) {
    return Math.ceil(rateLimitReset);
  }

  const bodySeconds = (body as { retryAfterSeconds?: unknown } | null)
    ?.retryAfterSeconds;
  if (typeof bodySeconds === 'number' && bodySeconds >= 0)
    return Math.ceil(bodySeconds);

  return DEFAULT_RETRY_AFTER_SECONDS;
}

function pluralize(value: number, unit: string) {
  return `${value} ${unit}${value === 1 ? '' : 's'}`;
}

export function formatRetryDelay(totalSeconds: number): string {
  if (totalSeconds < 60) return pluralize(totalSeconds, 'second');

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60)
    return seconds === 0
      ? pluralize(minutes, 'minute')
      : `${minutes}m ${seconds}s`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes === 0
    ? pluralize(hours, 'hour')
    : `${hours}h ${remainingMinutes}m`;
}

export function formatRetryTime(retryAtMs: number): string {
  return new Date(retryAtMs).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
}

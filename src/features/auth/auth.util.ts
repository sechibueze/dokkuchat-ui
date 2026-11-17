import {
  AUTH_COOKIE_NAME,
  DEFAULT_AUTHENTICATED_PATH,
} from '@/features/auth/constant';

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

// Lets middleware know a session exists. For production, prefer an httpOnly cookie set by your API.
export function writeSessionCookie(accessToken: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(accessToken)}; path=/; max-age=${SEVEN_DAYS_IN_SECONDS}; SameSite=Lax`;
}

export function clearSessionCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

/** Only allow same-site relative paths to prevent open redirects. */
export function getSafeRedirectPath(candidate: string | undefined): string {
  if (!candidate || !candidate.startsWith('/') || candidate.startsWith('//')) {
    return DEFAULT_AUTHENTICATED_PATH;
  }
  return candidate;
}

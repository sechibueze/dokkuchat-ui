import { NextResponse, type NextRequest } from 'next/server';
import {
  AUTH_COOKIE_NAME,
  DEFAULT_AUTHENTICATED_PATH,
} from '@/features/auth/constant';

const PROTECTED_PREFIXES = ['/chat', '/dashboard', '/settings', '/admin'];
const AUTH_PAGES = ['/login', '/signup', '/forgot-password'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(AUTH_COOKIE_NAME);

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  if (isProtected && !hasSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (AUTH_PAGES.includes(pathname) && hasSession) {
    return NextResponse.redirect(
      new URL(DEFAULT_AUTHENTICATED_PATH, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/chat/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
    '/admin/:path*',
    '/login',
    '/signup',
    '/forgot-password',
  ],
};

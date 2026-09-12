import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';
import {ADMIN_COOKIE} from './lib/admin/constants';

const handleI18nRouting = createMiddleware(routing);

// Admin pages that must work without a token.
const ADMIN_PUBLIC_PATHS = ['/admin/login', '/admin/session-expired'];

export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    // Optimistic check only: every admin page and action re-verifies the
    // token with the Laravel API, which is the real auth boundary.
    if (!ADMIN_PUBLIC_PATHS.includes(pathname) && !request.cookies.has(ADMIN_COOKIE)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};

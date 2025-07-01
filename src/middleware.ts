import { NextRequest, NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/dashboard/*',
];

// Define auth routes that should redirect to dashboard if user is already authenticated
const authRoutes = [
  '/sign-in',
  '/sign-up'
];

// Helper function to check if a path is protected
function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

// Helper function to check if a path is an auth route
function isAuthRoute(pathname: string): boolean {
  return authRoutes.some(route => pathname.startsWith(route));
}

// Helper function to safely parse JSON cookie
function parseCookie(cookieValue: string | undefined): any {
  if (!cookieValue) return null;

  try {
    // Decode URL-encoded value first, then parse JSON
    const decodedValue = decodeURIComponent(cookieValue);
    const parsed = JSON.parse(decodedValue);
    return parsed;
  } catch (error) {
    // Fallback: try parsing without decoding (for backwards compatibility)
    try {
      const parsed = JSON.parse(cookieValue);
      return parsed;
    } catch (fallbackError) {
      return null;
    }
  }
}

// Helper function to validate authentication
function isValidAuth(token: any, user: any): boolean {
  // Check if token exists and has required properties
  if (!token || typeof token !== 'object') return false;
  if (!token.token || typeof token.token !== 'string') return false;

  // Check if user exists and has required properties
  if (!user || typeof user !== 'object') return false;
  if (!user.email || typeof user.email !== 'string') return false;

  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get authentication cookies and parse them
  const tokenCookie = request.cookies.get('token')?.value;
  const userCookie = request.cookies.get('user')?.value;

  const token = parseCookie(tokenCookie);
  const user = parseCookie(userCookie);

  const isAuthenticated = isValidAuth(token, user);


  if (isProtectedRoute(pathname)) {
    if (!isAuthenticated) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signInUrl);
    } else {
    }
  }

  if (isAuthRoute(pathname) && isAuthenticated) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
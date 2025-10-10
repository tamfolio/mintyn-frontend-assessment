import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = pathname.startsWith('/dashboard');
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
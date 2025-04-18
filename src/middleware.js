// File: src/middleware.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {

  const adminAuth=request.cookies.get('adminAuth')?.value;
  const pathname=request.nextUrl.pathname;

  if (pathname.startsWith('/Admin') && adminAuth !== 'true') {
    return NextResponse.redirect(new URL('/pages/',request.url))
  }

  // Allow the request to proceed if the user is authenticated or on other routes
  return NextResponse.next();
}

// Use the correct matcher for Next.js paths
export const config = {
  matcher: ['/Admin/:path*'], // Match '/Admin' and any sub-paths under '/Admin'
};

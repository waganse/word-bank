import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/words/3', request.url));
}

export const config = {
  matcher: ['/words'],
};

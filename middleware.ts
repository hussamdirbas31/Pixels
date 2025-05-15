import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/firebase/firebase-client';

export async function middleware(request: NextRequest) {
  // الوصول للكوكيز باستخدام NextRequest
  const session = request.cookies.get('session')?.value;
  const { pathname } = new URL(request.url);

  if (pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}
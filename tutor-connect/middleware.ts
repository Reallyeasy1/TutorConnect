//TODO: Configure middleware to redirect to login page if no session exists
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  console.log(session)
  console.log("helloworld")
  const url = request.nextUrl.clone();

  if (!url.pathname.startsWith('/client/login') && url.pathname.startsWith('/client')) {
    // Check if user is a client
    if (!session || session.randomKey !== 'client') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  } else if (!url.pathname.startsWith('/tutor/login') && url.pathname.startsWith('/tutor')) {
    // Check if user is a tutor
    if (!session || session.randomKey !== 'tutor') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/client/:path*', '/tutor/:path*'],
};

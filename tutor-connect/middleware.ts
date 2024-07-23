//TODO: Configure middleware to redirect to login page if no session exists
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl.clone();
  const isClientViewTutors = url.pathname.match(/^\/client\/[^\/]+\/view_tutors$/);
  const isTutorViewAssignments = url.pathname.match(/^\/tutor\/[^\/]+\/view_assignments$/);

  if (!isClientViewTutors && !url.pathname.startsWith('/client/login') && url.pathname.startsWith('/client')) {
    // Check if user is a client
    if (!session || session.randomKey !== 'client') {
      url.pathname = '/client/login';
      return NextResponse.redirect(url);
    }
  } else if (!isTutorViewAssignments &&!url.pathname.startsWith('/tutor/login') && url.pathname.startsWith('/tutor')) {
    // Check if user is a tutor
    if (!session || session.randomKey !== 'tutor') {
      url.pathname = '/tutor/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/client/:path*', '/tutor/:path*'],
};

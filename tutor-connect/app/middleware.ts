// import { getServerSession } from 'next-auth/next';
// import { authOptions } from './api/auth/[...nextauth]/route';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';


// export async function middleware(req: NextRequest) {
//   const session = await getServerSession({ req, ...authOptions });
//     console.log("hello")
//   // Redirect to /login if no session exists and request is to the root path
//   if (!session && req.nextUrl.pathname === '/') {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // Continue with the request if session exists or request is not to the root path
//   return NextResponse.next();
// }

// // Specify the paths that the middleware should apply to
// export const config = {
//   matcher: '/', // Apply to the root path only
// };

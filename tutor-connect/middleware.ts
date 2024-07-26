import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
	const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
	const url = request.nextUrl.clone();

	if (
		!url.pathname.startsWith("/client/login") &&
		!url.pathname.startsWith("/client/invalid_session") &&
		!url.pathname.startsWith("/client/register") &&
		!url.pathname.startsWith("/client/forgot_password") &&
		!url.pathname.startsWith("/client/password_reset") &&
		!url.pathname.startsWith("/client/verify_email") &&
		url.pathname.startsWith("/client")
	) {
		// Check if user is a client
		const clientId = url.pathname.split("/")[2];
		if (!session || session.randomKey !== "client" || session.id !== clientId) {
			url.pathname = "/client/invalid_session";
			url.searchParams.set("error", "Account details mismatch.");
			return NextResponse.redirect(url);
		}
	} else if (
		!url.pathname.startsWith("/tutor/login") &&
		!url.pathname.startsWith("/tutor/invalid_session") &&
		!url.pathname.startsWith("/tutor/register") &&
		!url.pathname.startsWith("/tutor/forgot_password") &&
		!url.pathname.startsWith("/tutor/password_reset") &&
		!url.pathname.startsWith("/tutor/verify_email") &&
		url.pathname.startsWith("/tutor")
	) {
		// Check if user is a tutor
		const tutorId = url.pathname.split("/")[2];
		if (!session || session.randomKey !== "tutor" || session.id !== tutorId) {
			url.pathname = "/tutor/invalid_session";
			url.searchParams.set("error", "Account details mismatch.");
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/client/:path*", "/tutor/:path*"],
};

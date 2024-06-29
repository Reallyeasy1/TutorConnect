import { sendMail } from "@/lib/mailService";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		const user = await prisma.client.findUnique({
			where: { email },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "This email is not registered" },
				{ status: 404 }
			);
		}

		const token = await prisma.passwordResetClientToken.create({
			data: {
				clientId: user.id,
				token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
			},
		});

		const from: string = "<lowethan11@gmail.com>";
		const to: string = user.email;
		const subject: string = "Reset Password";
		const baseUrl: string = process.env.NEXTAUTH_URL || "https://tutorconnect-delta.vercel.app";
		const mailTemplate: string = `Hello ${user.name}, <br> Please click on the link to reset your password: ${baseUrl}/client/password_reset/${token.token}`;

		sendMail(from, to, subject, mailTemplate);

		return NextResponse.json({
			user: {
				email: user.email,
			},
		});
	} catch (err: any) {
		return new NextResponse(JSON.stringify({ error: err.message }), {
			status: 500,
		});
	}
}

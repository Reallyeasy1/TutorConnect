import { sendMail } from "@/lib/mailService";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		const user = await prisma.tutor.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "This email is not registered" },
                { status: 404 }
            );
        }

		const token = await prisma.activateTutorToken.create({
			data: {
				tutorId: user.id,
				token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
			},
		});

		const from: string = "<lowethan11@gmail.com>";
		const to: string = user.email;
		const subject: string = "Please Activate Your Account";
		const baseUrl: string = process.env.NEXTAUTH_URL || "http://localhost:3000";
		const mailTemplate: string = `Hello ${user.name}, <br> Please click on the link to activate your account: https://tutorconnect-delta.vercel.app/api/tutor/activate/${token.token}`;

		sendMail(from, to, subject, mailTemplate);

		return NextResponse.json({
			user: {
				email: user.email,
			},
		});
	} catch (err: any) {
		return new NextResponse(
			JSON.stringify({
				error: err.message,
			}),
			{
				status: 500,
			}
		);
	}
}

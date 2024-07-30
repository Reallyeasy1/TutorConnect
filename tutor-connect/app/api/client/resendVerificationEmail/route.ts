import { sendMail } from "@/lib/mailService";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
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

		const token = await prisma.activateClientToken.create({
			data: {
				clientId: user.id,
				token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
			},
		});

		const from: string = "<lowethan11@gmail.com>";
		const to: string = user.email;
		const subject: string = "Please Activate Your Account";
	    const mailTemplate: string = `
      		<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        		<h2>Hello ${user.name},</h2>
        		<p>Please click on the link below to activate your account:</p>
        		<p>
          		<a href="https://tutorconnect-delta.vercel.app/api/client/activate/${token.token}" 
             	   style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            		Activate Your Account
          		</a>
        		</p>
        		<p>If you did not request this activation, please ignore this email.</p>
        		<br>
        		<p>Thank you,</p>
        		<p>The TutorConnect Team</p>
      		</div>
    	`;

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

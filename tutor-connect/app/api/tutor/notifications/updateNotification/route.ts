import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { tutorId } = await req.json();

		const createdNotification = await prisma.tutorNotification.create({
			data: {
				tutor: { connect: { id: parseInt(tutorId) } },
				type: "update",
			},
		});

		return NextResponse.json({
			createdNotification,
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

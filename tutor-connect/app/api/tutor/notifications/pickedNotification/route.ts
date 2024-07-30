import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { tutorId, clientId, assignmentId } = await req.json();

		const createdNotification = await prisma.tutorNotification.create({
			data: {
				client: { connect: { id: parseInt(clientId) } },
				tutor: { connect: { id: parseInt(tutorId) } },
				assignment: { connect: { id: parseInt(assignmentId) } },
				type: "picked",
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

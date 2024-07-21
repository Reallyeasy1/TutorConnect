import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { clientId, tutorId, assignmentId } = await req.json();

		const createdNotification = await prisma.clientNotification.create({
			data: {
				client: { connect: { id: parseInt(clientId) } },
				tutor: { connect: { id: parseInt(tutorId) } },
				assignment: { connect: { id: parseInt(assignmentId) } },
				type: "paid",
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

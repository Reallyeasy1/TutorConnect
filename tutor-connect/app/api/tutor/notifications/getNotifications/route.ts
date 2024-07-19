import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { tutorId } = await req.json();

		const notifications = await prisma.tutorNotification.findMany({
			where: {
				tutorId: parseInt(tutorId),
			},
			include: {
				tutor: true,
                client: true,
                assignment: true,
			},
		});

		return NextResponse.json({
			notifications,
		});
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

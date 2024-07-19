import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
	try {
		const { notificationId } = await req.json();

		const read = await prisma.clientNotification.update({
			where: { id: parseInt(notificationId) },
			data: { read: true },
		});

		return NextResponse.json({
			read,
		});
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

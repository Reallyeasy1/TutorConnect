import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { tutorId } = await req.json();

		const assignments = await prisma.assignment.findMany({
			where: {
				tutorId: parseInt(tutorId),
			},
			include: {
				client: true,
			},
		});

		return NextResponse.json({
			assignments,
		});
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { tutorId } = await req.json();

		const reviews = await prisma.review.findMany({
			where: {
				tutorId: parseInt(tutorId),
			},
		});

		return NextResponse.json({
			reviews,
		});
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

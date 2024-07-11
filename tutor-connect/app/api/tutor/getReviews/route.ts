import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { tutorId } = await req.json();

		const reviews = await prisma.review.findMany({
			where: {
				tutorId: parseInt(tutorId),
			},
			include: {
				client: true,
			},
		});

		const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

		return NextResponse.json({
			reviews,
			averageRating,
		});
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

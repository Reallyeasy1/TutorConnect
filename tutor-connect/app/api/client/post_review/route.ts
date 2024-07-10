import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { tutorId, clientId, review, rating } = await req.json();

		const creation = await prisma.review.create({
			data: {
				tutorId: parseInt(tutorId),
				clientId: parseInt(clientId),
				review,
				rating: parseInt(rating),
			},
		});

		return NextResponse.json({
			creation,
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

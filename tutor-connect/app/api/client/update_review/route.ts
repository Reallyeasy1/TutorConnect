import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
	try {
		const { reviewId, review, rating } = await req.json();

        await prisma.review.update({
            where: {
                id: parseInt(reviewId),
            },
            data: {
                review,
                rating,
            },
        });

        return NextResponse.json({ message: "Review updated" });

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

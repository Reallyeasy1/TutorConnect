import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
	try {
		const { reviewId } = await req.json();

		const reviewDelete = await prisma.review.delete({
			where: { id: reviewId },
		});

		return NextResponse.json({ message: "Review deleted" });
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

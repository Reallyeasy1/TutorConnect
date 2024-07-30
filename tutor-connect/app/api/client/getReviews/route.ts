import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { clientId } = await req.json();

		const reviews = await prisma.review.findMany({
			where: {
				clientId: parseInt(clientId),
			},
			include: {
				tutor: true,
                client: true,
			},
		});

		return NextResponse.json({
			reviews,
            clientName: reviews[0].client.name,
            clientImage: reviews[0].client.image,
		});
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

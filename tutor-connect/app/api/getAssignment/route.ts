import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { assignmentId } = await req.json();

	try {
		const assignments = await prisma.assignment.findUnique({
			where: { id: parseInt(assignmentId) },
			include: {
				client: true,
				tutor: true,
			},
		});

		return NextResponse.json({
			assignments,
		});
	} catch (err: any) {
		return new NextResponse(
			JSON.stringify({
				error: err.message,
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}

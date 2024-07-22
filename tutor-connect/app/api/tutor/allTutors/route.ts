import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const limit = 8;

		const tutors = await prisma.tutor.findMany({
			where: {
				active: true,
			},
		});
		const totalTutors = await prisma.tutor.count({
			where: {
				active: true,
			},
		});
		const totalPages = Math.ceil(totalTutors / limit);

		return NextResponse.json({
			tutors,
			totalPages,
		});
	} catch (err: any) {
		return new NextResponse(JSON.stringify({ error: err.message }), {
			status: 500,
		});
	}
}

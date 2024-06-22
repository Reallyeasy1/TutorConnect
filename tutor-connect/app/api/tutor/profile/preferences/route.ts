import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const {
			email,
			location,
            levelAndSubjects,
            introduction,
            summary,
            studentsResults,
		} = await req.json();

		const updatedTutor = await prisma.tutor.update({
			where: { email: email as string },
			data: {
				location,
                levelAndSubjects,
                introduction,
                summary,
                studentsResults,
			},
		});

		return NextResponse.json({ success: "Changes made successfully" });
	} catch (err) {
		console.error("Error updating tutor:", err);

		return NextResponse.json(
			{
				error: "An unexpected error occurred. Please try again and if the problem persists, contact support.",
			},
			{ status: 500 }
		);
	}
}
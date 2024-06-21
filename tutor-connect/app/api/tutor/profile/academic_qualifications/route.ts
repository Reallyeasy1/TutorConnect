import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const {
			email,
			typeOfTutor,
			yearsOfExperience,
			highestEducationLevel,
		} = await req.json();

		const updatedTutor = await prisma.tutor.update({
			where: { email: email as string },
			data: {
                yearsOfExperience: parseInt(yearsOfExperience),
                typeOfTutor,
                highestEducationLevel,
            },
		});

		return NextResponse.json({ success: "Changes made successfully" });
	} catch (err) {
		console.error("Error updating client:", err);

		return NextResponse.json(
			{
				error: "An unexpected error occurred. Please try again and if the problem persists, contact support.",
			},
			{ status: 500 }
		);
	}
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const {
			email,
			contactNumber,
			dateOfBirth,
			gender,
			age,
			nationality,
			race,
		} = await req.json();

		const updatedTutor = await prisma.tutor.update({
			where: { email: email as string },
			data: {
				contactNumber: parseInt(contactNumber),
                dateOfBirth: new Date(dateOfBirth),
                gender,
                age: parseInt(age),
                nationality,
                race,
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

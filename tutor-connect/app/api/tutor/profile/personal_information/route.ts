import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const formData = await req.formData();

		const email = formData.get("email");
		const contactNumber = formData.get("contactNumber");
		const dateOfBirth = formData.get("dateOfBirth");
		const gender = formData.get("gender");
		const age = formData.get("age");
		const nationality = formData.get("nationality");
		const race = formData.get("race");
		const image = formData.get("image");

		let updateData: any = {
			contactNumber: parseInt(contactNumber as string),
			dateOfBirth: new Date(dateOfBirth as string),
			gender,
			age: parseInt(age as string),
			nationality,
			race,
		};

		if (image) {
			updateData.image = image;
		}

		const updatedTutor = await prisma.tutor.update({
			where: { email: email as string },
			data: updateData,
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

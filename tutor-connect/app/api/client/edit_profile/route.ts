import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const formData = await req.formData();

		const email = formData.get("email");
		const contactNumber = formData.get("contactNumber");
		const address = formData.get("address");
		const postalCode = formData.get("postalCode");
		const image = formData.get("image");

		if (!email || !contactNumber || !address || !postalCode) {
			return NextResponse.json(
				{ error: "All fields are required." },
				{ status: 400 }
			);
		}

		let updateData: any = {
			contactNumber: parseInt(contactNumber as string),
			address: address as string,
			postalCode: parseInt(postalCode as string),
		};

		if (image) {
			updateData.image = image;
		}

		const updatedClient = await prisma.client.update({
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
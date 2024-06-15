import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const { email, contactNumber, address, postalCode } = await req.json();

		if (!email || !contactNumber || !address || !postalCode) {
			return NextResponse.json(
				{ error: "All fields are required." },
				{ status: 400 }
			);
		}

		const updatedClient = await prisma.client.update({
			where: { email: email },
			data: {
				contactNumber: parseInt(contactNumber),
				address,
				postalCode: parseInt(postalCode),
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

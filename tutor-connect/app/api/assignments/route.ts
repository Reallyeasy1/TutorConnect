import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const data = await req.json(); // Get the data from the request body

		// You can use the data to create a new assignment, for example
		const newAssignment = await prisma.assignment.create({
			data: {
				// Use the data from the request body
				title: data.title,
				description: data.description,
				clientId: data.clientId,
				tutorId: data.tutorId,
				// Add other fields as necessary
			},
			include: {
				client: true, // Include client details if needed
				tutor: true, // Include tutor details if needed
				avail_tutors: true, // Include available tutors if needed
			},
		});

		return new NextResponse(JSON.stringify(newAssignment), {
			status: 201, // Created
			headers: { "Content-Type": "application/json" },
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

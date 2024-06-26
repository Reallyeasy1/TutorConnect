import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Tutor {
	id: number;
	email: string;
	password: string;
	name: string;
	contactNumber: number;
	dateOfBirth: string;
	gender: string;
	age: number;
	nationality: string;
	race: string;
	typeOfTutor: string;
	yearsOfExperience: number;
	highestEducationLevel: string;
}

export async function PUT(req: Request) {
	try {
		const body = await req.json();
		console.log(body);

		const { clientId, AssignmentId, tutor } = body;

		// Validate required fields
		if (!tutor) {
			return new NextResponse(
				JSON.stringify({
					error: "Tutor not found",
				}),
				{
					status: 400,
				}
			);
		}

		// Validate clientId is a number
		const clientIdNumber = parseInt(clientId);
		if (isNaN(clientIdNumber)) {
			return new NextResponse(
				JSON.stringify({
					error: "Invalid client ID",
				}),
				{
					status: 400,
				}
			);
		}

		// Validate assignmentId is a number
		const assignmentIdNumber = parseInt(AssignmentId);
		if (isNaN(assignmentIdNumber)) {
			return new NextResponse(
				JSON.stringify({
					error: "Invalid assignment ID",
				}),
				{
					status: 400,
				}
			);
		}

		// Find the client
		const client = await prisma.client.findUnique({
			where: { id: clientIdNumber },
		});

		if (!client) {
			return new NextResponse(
				JSON.stringify({
					error: "Client not found",
				}),
				{
					status: 404,
				}
			);
		}

		// Update the assignment with the tutor
		await prisma.assignment.update({
			where: { id: assignmentIdNumber },
			data: {
				taken: true,
				tutor: { connect: { id: tutor.id } },
			},
		});

		// Update the tutor with the new assignment
		await prisma.tutor.update({
			where: { id: tutor.id },
			data: {
				assignmentsAvailable: {
					disconnect: { id: assignmentIdNumber },
				},
				assignmentsPrimary: {
					connect: { id: assignmentIdNumber },
				},
			},
		});

		return new NextResponse(
			JSON.stringify({
				message: "Successfully accepted the tutor",
			}),
			{
				status: 200,
			}
		);
	} catch (err: any) {
		return new NextResponse(
			JSON.stringify({
				error: err.message,
			}),
			{
				status: 500,
			}
		);
	}
}

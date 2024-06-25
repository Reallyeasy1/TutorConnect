import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
	try {
		const body = await req.json();
		console.log(body);

		const {
			AssignmentId,
			Subject,
			Level,
			clientId,
			tuteeLocation,
			minRate,
			maxRate,
			description,
			postDate,
			tutorId,
		} = body;

		// Validate required fields
		if (
			!tutorId ||
			!AssignmentId ||
			!Subject ||
			!Level ||
			!clientId ||
			!minRate ||
			!maxRate ||
			!postDate
		) {
			return new NextResponse(
				JSON.stringify({
					error: "Missing required fields",
				}),
				{
					status: 400,
				}
			);
		}

		// Validate tutorId is a number
		const tutorIdNumber = parseInt(tutorId);
		if (isNaN(tutorIdNumber)) {
			return new NextResponse(
				JSON.stringify({
					error: "Invalid tutor ID",
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

		// Find the tutor
		const tutor = await prisma.tutor.findUnique({
			where: { id: tutorIdNumber },
		});

		if (!tutor) {
			return new NextResponse(
				JSON.stringify({
					error: "Tutor not found",
				}),
				{
					status: 404,
				}
			);
		}

		// Find the assignment with available tutors included
		const assignment_found = await prisma.assignment.findUnique({
			where: { id: AssignmentId },
			include: { avail_tutors: true },
		});

		if (!assignment_found) {
			return new NextResponse(
				JSON.stringify({
					error: "Assignment not found",
				}),
				{
					status: 404,
				}
			);
		}

		// Check if tutor is already in the available tutors
		const tutorExists = assignment_found.avail_tutors.some(t => t.id === tutor.id);
		if (tutorExists) {
			return new NextResponse(
				JSON.stringify({
					error: "Tutor is already an available tutor for this assignment",
				}),
				{
					status: 400,
				}
			);
		}

		// Update the assignment with the new available tutor
		await prisma.assignment.update({
			where: { id: AssignmentId },
			data: {
				subject: Subject,
				level: Level,
				location: tuteeLocation,
				minRate,
				maxRate,
				description,
				postDate: new Date(postDate),
				taken: false,
				avail_tutors: {
					connect: { id: tutor.id },
				},
				client: { connect: { id: clientIdNumber } },
			},
		});

		// Update the tutor with the new assignment
		await prisma.tutor.update({
			where: { id: tutor.id },
			data: {
				assignmentsAvailable: {
					connect: { id: AssignmentId },
				},
			},
		});

		return new NextResponse(
			JSON.stringify({
				message: "Successfully applied for assignment",
			}),
			{
				status: 200,
			}
		);
	} catch (err: any) {
		console.error(err);
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

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
		//|| !tuteeLocation
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

		// Add tutor to available tutors for the assignment
		const updatedAvailTutors = [...assignment_found.avail_tutors, tutor];

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
					set: updatedAvailTutors,
				},
				client: { connect: { id: parseInt(clientId) } },
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

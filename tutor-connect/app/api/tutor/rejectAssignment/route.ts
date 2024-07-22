import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { tutorId, assignmentId } = await req.json();

		// Find the tutor
		const tutor = await prisma.tutor.findUnique({
			where: { id: parseInt(tutorId) },
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
			where: { id: parseInt(assignmentId) },
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

		const updatedAvailTutors = assignment_found.avail_tutors.filter((t) => t.id !== tutor.id);

		// Update the assignment with the new available tutor
		await prisma.assignment.update({
			where: { id: parseInt(assignmentId) },
			data: {
				taken: false,
				avail_tutors: {
					set: updatedAvailTutors.map((t) => ({ id: t.id })),
				},
				tutorId: null,
			},
		});

		await prisma.tutor.update({
			where: { id: tutor.id },
			data: {
				assignmentsAvailable: {
					disconnect: { id: assignmentId },
				},
			},
		});

		return new NextResponse(
			JSON.stringify({
				message: "Successfully removed tutor from assignment",
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

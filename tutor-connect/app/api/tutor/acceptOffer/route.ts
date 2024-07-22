import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { tutorId, assignmentId } = await req.json();

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

		const assignment_found = await prisma.assignment.findUnique({
			where: { id: parseInt(assignmentId) },
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

		await prisma.assignment.update({
			where: { id: assignmentId },
			data: {
				taken: true,
			},
		});

		return new NextResponse(
			JSON.stringify({
				message: "Successfully accepted assignment",
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

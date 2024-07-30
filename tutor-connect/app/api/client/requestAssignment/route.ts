import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// TODO: Validate data here
export async function POST(req: Request) {
	try {
		const body = await req.json();

		const {
			clientId,
			level,
			subject,
			address,
			unitNumber,
			postalCode,
			minRate,
			maxRate,
			duration,
			frequency,
			additionalDetails,
			typeOfTutor,
			gender,
			race,
			availability,
			postDate,
			location,
			amount,
			startDate,
			tutorId,
		} = body;

		// Validate required fields

		if (minRate > maxRate || minRate < 0 || maxRate < 0) {
			return new NextResponse(
				JSON.stringify({
					error: "Invalid minRate or maxRate",
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

		const client = await prisma.client.findUnique({
			where: {
				id: clientIdNumber,
			},
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

		const coordinates = location.split(",").map((part: string) => parseFloat(part.trim()));

		const assignment = await prisma.assignment.create({
			data: {
				client: { connect: { id: clientIdNumber } },
				level,
				subject,
				address,
				unitNumber,
				postalCode: parseInt(postalCode),
				minRate: parseInt(minRate),
				maxRate: parseInt(maxRate),
				duration,
				frequency,
				additionalDetails,
				typeOfTutor: [typeOfTutor],
				gender,
				race: [race],
				availability,
				postDate: new Date(postDate),
				taken: false,
				avail_tutors: {
					create: [],
				},
				coordinates: coordinates,
				amount: parseFloat(amount),
				startDate,
				tutor: { connect: { id: parseInt(tutorId) } },
				isRequest: true,
			},
		});

		return new NextResponse(
			JSON.stringify({
				assignment,
			}),
			{
				status: 201,
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

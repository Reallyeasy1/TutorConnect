import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
	try {
        const body = await req.json();
		console.log(body);

		const {
			assignmentId,
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
		} = body;

		// Validate required fields
		if (
			!assignmentId ||
			!subject ||
			!level ||
			!clientId ||
			!address ||
			!postalCode ||
			minRate == null ||
			maxRate == null ||
			!postDate ||
			!duration ||
			!frequency ||
			!typeOfTutor ||
			!gender ||
			!race ||
			!availability
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

		// Validate rates
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

		const assignment = await prisma.assignment.update({
			where: { id: parseInt(assignmentId) },
			data: {
				subject: subject,
				level: level,
				client: { connect: { id: clientIdNumber } },
				address: address,
				unitNumber: unitNumber,
				postalCode: postalCode,
				minRate: minRate,
				maxRate: maxRate,
				duration: duration,
				frequency: frequency,
				additionalDetails: additionalDetails,
				typeOfTutor: typeOfTutor,
				gender: gender,
				race: race,
				availability: availability,
				postDate: new Date(postDate), // Ensure postDate is a valid Date
				taken: false, // Adjust as needed for your use case
			},
		});

		return new NextResponse(
			JSON.stringify({
				assignment,
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

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { parse } from "path";

// TODO: Validate data here
export async function POST(req: Request) {
	try {
		const body = await req.json();
		console.log(body);

		const {
			clientId,
			level,
			subject,
			address,
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

		const assignment = await prisma.assignment.create({
			data: {
				client: { connect: { id: clientIdNumber } },
				level,
				subject,
				address,
				postalCode: parseInt(postalCode),
				minRate: parseInt(minRate),
				maxRate: parseInt(maxRate),
				duration,
				frequency,
				additionalDetails,
				typeOfTutor,
				gender,
				race,
				availability,
				postDate: new Date(postDate), // Ensure postDate is a valid Date
				taken: false,
				avail_tutors: {
					create: [],
				},
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

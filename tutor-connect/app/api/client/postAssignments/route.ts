import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Received request body:', body);

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
            location,
        } = body;

		if (clientId == null ||
            level == null ||
            subject == null ||
            address == null ||
            postalCode == null ||
            minRate == null ||
            maxRate == null || 
            duration == null ||
            frequency == null ||
			additionalDetails == null ||
			typeOfTutor == null ||
			gender == null ||
			race == null) {
			console.log('Missing required fields');
			return new NextResponse(
				JSON.stringify({
					error: "Missing required fields",
				}),
				{
					status: 500,
				}
			);
		}

        

        // Validate required fields
        if (minRate > maxRate || minRate < 0 || maxRate < 0) {
            console.log('Invalid minRate or maxRate:', { minRate, maxRate });
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
            console.log('Invalid client ID:', clientId);
            return new NextResponse(
                JSON.stringify({
                    error: "Invalid client ID",
                }),
                {
                    status: 400,
                }
            );
        }

        console.log('Validating client with ID:', clientIdNumber);
		const client = await prisma.client.findUnique({
            where: {
                id: clientIdNumber,
            },
        });
		console.log("Client Details:", client)

        if (!client) {
            console.log('Client not found:', clientIdNumber);
            return new NextResponse(
                JSON.stringify({
                    error: "Client not found",
                }),
                {
                    status: 404,
                }
            );
        }

        console.log('Client found:', client);

        const coordinates = location.split(",").map((part: string) => parseFloat(part.trim()));
        console.log('Parsed coordinates:', coordinates);

        console.log('Creating assignment with data:', {
            clientIdNumber,
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
            postDate: new Date(postDate),
            coordinates,
        });

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
                coordinates: coordinates,
            },
        });

        console.log('Assignment created:', assignment);

        return new NextResponse(
            JSON.stringify({
                assignment,
            }),
            {
                status: 201,
            }
        );
    } catch (err: any) {
        console.error('Error occurred:', err);
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

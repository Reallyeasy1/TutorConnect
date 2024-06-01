import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// TODO: Validate data here
export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(body);

        const { Subject, Level, clientId, tuteeLocation, MinRate, MaxRate, description, postDate } = body;

        // Validate required fields
        if (!Subject || !Level || !clientId || !tuteeLocation || !MinRate || !MaxRate || !postDate) {
            return new NextResponse(JSON.stringify({
                error: 'Missing required fields'
            }), {
                status: 400
            });
        }


        if (MinRate > MaxRate || MinRate < 0 || MaxRate < 0) {

            return new NextResponse(JSON.stringify({
                error: 'Invalid minRate or maxRate'
            }), {
                status: 400
            });
        }

        // Validate clientId is a number
        const clientIdNumber = parseInt(clientId);
        if (isNaN(clientIdNumber)) {
            return new NextResponse(JSON.stringify({
                error: 'Invalid client ID'
            }), {
                status: 400
            });
        }

        const client = await prisma.client.findUnique({
            where: {
                id: clientIdNumber
            }
        });

        if (!client) {
            return new NextResponse(JSON.stringify({
                error: 'Client not found'
            }), {
                status: 404
            });
        }

        const assignment = await prisma.assignment.create({
            data: {
                subject: Subject,
                level: Level,
                client: { connect: { id: clientIdNumber } },
                location: tuteeLocation,
                minRate: MinRate,
                maxRate: MaxRate,
                description: description,
                postDate: new Date(postDate), // Ensure postDate is a valid Date
                taken: false
            }
        });

        return new NextResponse(JSON.stringify({
            assignment
        }), {
            status: 201
        });

    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }), {
            status: 500
        });
    }
}
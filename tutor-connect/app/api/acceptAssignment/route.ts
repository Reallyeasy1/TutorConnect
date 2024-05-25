import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// TODO: Validate data here
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        console.log(body);

        const { AssignmentId, Subject, Level, clientId, 
            tuteeLocation, minRate, maxRate, description, postDate, tutorId } = body;

        // Validate required fields
        if (!tutorId || !AssignmentId || !Subject || !Level || !clientId || !tuteeLocation || !minRate || !maxRate || !postDate) {
            return new NextResponse(JSON.stringify({
                error: 'Missing required fields'
            }), {
                status: 400
            });
        }

        
        // Validate tutorId is a number
        const tutorIdNumber = parseInt(tutorId);
        if (isNaN(tutorIdNumber)) {
            return new NextResponse(JSON.stringify({
                error: 'Invalid tutor ID'
            }), {
                status: 400
            });
        }

        // Find the tutor
        const tutor = await prisma.tutor.findUnique({
            where: {
                id: tutorIdNumber
            }
        });

        if (!tutor) {
            return new NextResponse(JSON.stringify({
                error: 'Tutor not found'
            }), {
                status: 404
            });
        }

        // Upsert the assignment
        const assignment = await prisma.assignment.upsert({
            where: { id: AssignmentId },
            update: {
                Subject,
                Level,
                Location: tuteeLocation,
                minRate,
                maxRate,
                description,
                postDate: new Date(postDate),
                tutor: { connect: { id: tutorIdNumber } },
                taken: true,
                client: { connect: { id: parseInt(clientId) } } // Add the client property
            },
            create: {
                Subject,
                Level,
                Location: tuteeLocation,
                minRate,
                maxRate,
                description,
                postDate: new Date(postDate),
                tutor: { connect: { id: tutorIdNumber } },
                taken: true,
                client: { connect: { id: parseInt(clientId) } } // Add the client property
            }
        });

        return new NextResponse(JSON.stringify({
            assignment
        }), {
            status: 200
        });

    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }), {
            status: 500
        });
    }
}

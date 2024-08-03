import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const assignmentid = searchParams.get("id");

        if (!assignmentid) {
            return new NextResponse(
                JSON.stringify({
                    error: "Missing assignment ID",
                }),
                {
                    status: 400,
                }
            );
        }

        // Validate assignmentId is a number
        const assignmentIdNumber = parseInt(assignmentid);
        if (isNaN(assignmentIdNumber)) {
            return new NextResponse(
                JSON.stringify({
                    error: "Invalid assignment ID",
                }),
                {
                    status: 400,
                }
            );
        }

        const clientNotif = await prisma.clientNotification.deleteMany({
            where: { assignmentId: assignmentIdNumber },
        });

        const tutorNotif = await prisma.tutorNotification.deleteMany({
            where: { assignmentId: assignmentIdNumber },
        });

        const assignment = await prisma.assignment.delete({
            where: { id: assignmentIdNumber },
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

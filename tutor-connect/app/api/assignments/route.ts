import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const assignments = await prisma.assignment.findMany({
            // where: { taken: false }, // Fetch only available assignments
            include: {
                client: true, // Include client details if needed
                tutor: true  // Include tutor details if needed
            }
        });

        return new NextResponse(JSON.stringify(assignments), {
            status: 200,
             headers: { 'Content-Type': 'application/json' }
        });
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }), {
            status: 500,
             headers: { 'Content-Type': 'application/json' }
        });
    }
}
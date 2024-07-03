import { prisma } from "@/lib/prisma"; 
import { NextResponse } from "next/server"; 
 
export async function GET(req: Request) { 
  try { 
    // Extracting the assignmentId from the URL path parameters
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const tutorId = parseInt(pathParts[pathParts.length - 2], 10);

    if (isNaN(tutorId) || tutorId <= 0) { 
      return new NextResponse(JSON.stringify({ error: 'Invalid tutor ID' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' }, 
      }); 
    } 
 
    const acceptedAssignments = await prisma.assignment.findMany({ 
      where: { 
        tutorId: tutorId, 
        },
        include: {
          client: true,
        } 
      } 
    ); 
 
    return new NextResponse(JSON.stringify({ acceptedAssignments: acceptedAssignments }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' }, 
    }); 
  } catch (err: any) { 
    console.error("Error fetching assignments:", err); 
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' }, 
    }); 
  } 
}
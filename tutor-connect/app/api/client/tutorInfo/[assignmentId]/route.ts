import { prisma } from "@/lib/prisma"; 
import { NextResponse } from "next/server"; 
 
export async function GET(req: Request) { 
  try { 
    // Extracting the assignmentId from the URL path parameters
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const assignmentId = parseInt(pathParts[pathParts.length - 1], 10);

    if (isNaN(assignmentId) || assignmentId <= 0) { 
      return new NextResponse(JSON.stringify({ error: 'Invalid assignment ID' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' }, 
      }); 
    } 
 
    const assignment = await prisma.assignment.findUnique({ 
      where: {
        id: assignmentId,
      } 
    }); 
 if (!assignment){
    return new NextResponse(JSON.stringify({error: "Assignment not found " }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' }, 
    }); 
 }

const tutorId = assignment.tutorId;

if (tutorId == null){
    return new NextResponse(JSON.stringify({error: "Tutor not found " }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' }, 
    }); 
    
}

 const tutor = await prisma.tutor.findUnique({
    where: {
        id: tutorId,
    }
 })
    return new NextResponse(JSON.stringify({ tutor: tutor }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' }, 
    }); 
  } catch (err: any) { 
    console.error("Error fetching tutors:", err); 
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' }, 
    }); 
  } 
}
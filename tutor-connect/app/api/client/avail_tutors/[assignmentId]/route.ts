
import { prisma } from "@/lib/prisma"; 
import { NextResponse } from "next/server"; 
 
export async function GET(req: Request) { 
  try { 
    const { searchParams } = new URL(req.url); 
    const assignmentId = parseInt(searchParams.get('assignmentId') || '0', 10); 
 
    if (!assignmentId) { 
      return new NextResponse(JSON.stringify({ error: 'Invalid assignment ID' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' }, 
      }); 
    } 
 
    const tutors = await prisma.tutor.findMany({ 
      where: { 
        assignmentsAvailable: { 
          some: { 
            id: assignmentId 
          } 
        } 
      } 
    }); 
 
    return new NextResponse(JSON.stringify({ avail_tutors: tutors }), { 
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
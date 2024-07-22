import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Tutor {
  id: number;
  email: string;
  password: string;
  name: string;
  contactNumber: number;
  dateOfBirth: string;
  gender: string;
  age: number;
  nationality: string;
  race: string;
  typeOfTutor: string;
  yearsOfExperience: number;
  highestEducationLevel: string;
}

export async function PUT(req: Request) {
  try {
    const { clientId, assignmentId, tutor, startDate, amount } = await req.json();
	

    // Validate required fields
    if (!tutor) {
      return new NextResponse(
        JSON.stringify({
          error: "Tutor not found",
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


    // Validate amount is a number
    const amountNumber = parseInt(amount);
    if (isNaN(amountNumber)) {
      return new NextResponse(
        JSON.stringify({
          error: "Invalid amount",
        }),
        {
          status: 400,
        }
      );
    }
		// Validate assignmentId is a number
		const assignmentIdNumber = parseInt(assignmentId);
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

    // Update the assignment with the tutor
    await prisma.assignment.update({
      where: { id: assignmentIdNumber },
      data: {
        startDate: startDate,
        amount: amountNumber,
        tutor: { connect: { id: tutor.id } },
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Offer sent to tutor",
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



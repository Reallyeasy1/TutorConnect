import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { assignmentId } = await req.json();

    const updateAssignment = await prisma.assignment.update({
      where: { id: parseInt(assignmentId) },
      data: { isPaid: true },
    });

    return NextResponse.json({ updateAssignment });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: "Unable to update payment status.",
      },
      { status: 500 }
    );
  }
}

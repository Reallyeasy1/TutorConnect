import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET Chat Details
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tutorId = url.searchParams.get("tutorId");

    let user;
    if (tutorId) {
      user = await prisma.tutor.findUnique({
        where: { id: parseInt(tutorId, 10) }, // Ensure the clientId is parsed as an integer
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "This tutor ID is not registered" },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET Chat Details
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const clientId = url.searchParams.get("clientId");

    let user;
    if (clientId) {
      user = await prisma.client.findUnique({
        where: { id: parseInt(clientId, 10) }, // Ensure the clientId is parsed as an integer
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "This client ID is not registered" },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        postalCode: user.postalCode,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

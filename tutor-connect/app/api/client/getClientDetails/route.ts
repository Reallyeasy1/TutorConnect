import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email, clientId } = await req.json();

		let user;
		if (email) {
			user = await prisma.client.findUnique({
				where: { email },
			});
		} else if (clientId) {
			user = await prisma.client.findUnique({
				where: { id: parseInt(clientId) },
			});
		}

		if (!user) {
			return NextResponse.json(
				{ error: "This email is not registered" },
				{ status: 404 }
			);
		} else {
			return NextResponse.json({ id: user.id, email: user.email, name: user.name });
		}
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

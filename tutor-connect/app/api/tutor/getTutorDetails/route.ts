import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email, tutorId } = await req.json();

		let user;
		if (email) {
			user = await prisma.tutor.findUnique({
				where: { email },
			});
		} else if (tutorId) {
			user = await prisma.tutor.findUnique({
				where: { id: parseInt(tutorId) },
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

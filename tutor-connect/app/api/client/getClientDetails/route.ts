import { prisma } from "@/lib/prisma";
import { notification } from "antd";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email, clientId } = await req.json();

		let user;
		if (email) {
			user = await prisma.client.findUnique({
				where: { email },
				include: {
					ClientNotification: true,
				},
			});
		} else if (clientId) {
			user = await prisma.client.findUnique({
				where: { id: parseInt(clientId) },
				include: {
					ClientNotification: true,
				},
			});
		}

		if (!user) {
			return NextResponse.json({ error: "This email is not registered" }, { status: 404 });
		} else {
			return NextResponse.json({
				id: user.id,
				email: user.email,
				name: user.name,
				contactNumber: user.contactNumber,
				address: user.address,
				postalCode: user.postalCode,
				image: user.image,
				notifications: user.ClientNotification,
			});
		}
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

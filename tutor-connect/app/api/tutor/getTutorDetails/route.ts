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
			return NextResponse.json({
				id: user.id,
				email: user.email,
				name: user.name,
				contactNumber: user.contactNumber,
				dateOfBirth: user.dateOfBirth,
				age: user.age,
				gender: user.gender,
				nationality: user.nationality,
				race: user.race,
				yearsOfExperience: user.yearsOfExperience,
				typeOfTutor: user.typeOfTutor,
				highestEducationLevel: user.highestEducationLevel,
				location: user.location,
				levelAndSubjects: user.levelAndSubjects,
				introduction: user.introduction,
				summary: user.summary,
				studentsResults: user.studentsResults,
				image: user.image,
			});
		}
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
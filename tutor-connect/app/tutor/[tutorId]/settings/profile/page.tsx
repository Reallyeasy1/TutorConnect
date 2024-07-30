import Footer from "@/components/footer/footer";
import { redirect } from "next/navigation";
import { EditProfile } from "./editProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export default async function ProfilePage() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.id) {
		redirect("/tutor/invalid_session");
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutor/getTutorDetails`, {
		method: "POST",
		body: JSON.stringify({
			tutorId: session.user.id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch tutor notifications");
	}

	const tutorData = await res.json();
	const showSubjects = {
		"Pre-School": false,
		"Primary School": false,
		"Secondary School": false,
		"Junior College": false,
		"IB/IGCSE": false,
		"Diploma/Degree": false,
	};

	(Object.keys(tutorData.levelAndSubjects) as (keyof typeof showSubjects)[]).forEach((level) => {
		if (tutorData.levelAndSubjects[level].length > 0) {
			showSubjects[level] = true;
		}
	});

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<EditProfile tutor={tutorData} checked={tutorData.levelAndSubjects} show={showSubjects} />
			<Footer />
		</div>
	);
}

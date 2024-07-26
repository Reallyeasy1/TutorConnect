import Footer from "@/components/footer/footer";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { AllAssignments } from "./allAssignments";

export default async function MyReviews() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.id) {
		redirect("/tutor/invalid_session");
	}

	const offer = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutor/getAssignments`, {
		method: "POST",
		body: JSON.stringify({
			tutorId: session.user.id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const apply = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutor/appliedAssignments`, {
		method: "POST",
		body: JSON.stringify({
			tutorId: session.user.id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!offer.ok || !apply.ok) {
		throw new Error("Failed to fetch tutor assignments");
	}

	const offeredData = await offer.json();
	const appliedData = await apply.json();
	
	return (
		<div className="flex flex-col min-h-screen">
			<AllAssignments tutorId={session.user.id} offered={offeredData.assignments} applied={appliedData.assignments} />
			<Footer />
		</div>
	);
}

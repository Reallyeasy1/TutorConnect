import Footer from "@/components/footer/footer";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import { AllAssignments } from "./allAssignments";

export default async function MyAssignments() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.id) {
		redirect("/client/invalid_session");
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/getAssignments`, {
		method: "POST",
		body: JSON.stringify({
			clientId: session.user.id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch client assignments");
	}

	const assignmentsData = await res.json();

	return (
		<div className="flex flex-col min-h-screen">
			<AllAssignments assignments={assignmentsData.assignments} clientId={session.user.id} />
			<Footer />
		</div>
	);
}

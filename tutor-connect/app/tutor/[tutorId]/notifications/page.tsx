import Footer from "@/components/footer/footer";
import { redirect } from "next/navigation";
import { Notifications } from "./notifications";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export default async function TutorNotifications() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.id) {
		redirect("/tutor/invalid_session");
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutor/notifications/getNotifications`, {
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

	return (
		<div className="flex flex-col min-h-screen" style={{ backgroundColor: "#fff" }}>
			<Notifications tutorId={session.user.id} notifs={tutorData.notifications}/>
			<Footer />
		</div>
	);
}

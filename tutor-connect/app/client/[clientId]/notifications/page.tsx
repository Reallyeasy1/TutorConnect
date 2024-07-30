import Footer from "@/components/footer/footer";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";
import { Notifications } from "./notifications";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export default async function NotificationsPage() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.id) {
		redirect("/client/invalid_session");
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/notifications/getNotifications`, {
		method: "POST",
		body: JSON.stringify({
			clientId: session.user.id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch client notifications");
	}

	const clientData = await res.json();

	return (
		<div className="flex flex-col min-h-screen">
			<Notifications notifs={clientData.notifications} clientId={session.user.id} />
			<Footer />
		</div>
	);
}

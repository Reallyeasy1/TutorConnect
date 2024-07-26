import Footer from "@/components/footer/footer";
import { Assignment, Client, Tutor } from "@prisma/client";
import { redirect, useParams } from "next/navigation";
import Loading from "@/app/loading";
import { Notifications } from "./notifications";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

type ClientNotification = {
	id: number;
	assignment: Assignment;
	client: Client;
	tutor: Tutor;
	date: string;
	message: string;
	read: boolean;
	type: string;
};

export default async function NotificationsPage() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.id) {
		redirect("/client/invalid_session");
	}

	try {
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
			throw new Error("Failed to fetch notifications");
		}

		const clientData = await res.json();

		return (
			<div className="flex flex-col min-h-screen">
				<Notifications notifs={clientData.notifications} clientId={session.user.id} />
				<Footer />
			</div>
		);
	} catch (error) {
		console.error("Error fetching notifications:", error);
		return (
			<div className="flex flex-col min-h-screen">
				<Loading />
				<Footer />
			</div>
		);
	}
}

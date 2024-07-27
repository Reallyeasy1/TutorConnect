import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import React from "react";
import NavBar from "@/components/nav-bar/navBar";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { ClientNotification, TutorNotification } from "@prisma/client";
import { authOptions } from "@/utils/authOptions";

export const metadata: Metadata = {
	title: "TutorConnect",
	description: "TutorConnect is a platform that connects tutors and students.",
	icons: {
		icon: "/favicon.ico",
	},
};

type RootLayoutProps = {
	children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
	const session = await getServerSession(authOptions);

	let userImage = null;
	let userName = null;
	let userId = null;
	let userRole: "client" | "tutor" | null = null;
	let userNotifications: ClientNotification[] | TutorNotification[] = [];

	if (session?.user?.email) {
		try {
			if (session.user.randomKey === "tutor") {
				const tutorDetails = await prisma.tutor.findUnique({
					where: { email: session.user.email },
					include: { TutorNotification: true },
				});
				userImage = tutorDetails?.image || null;
				userName = tutorDetails?.name || null;
				userId = tutorDetails?.id || null;
				userRole = "tutor";
				userNotifications = tutorDetails?.TutorNotification || [];
			} else {
				const clientDetails = await prisma.client.findUnique({
					where: { email: session.user.email },
					include: { ClientNotification: true },
				});
				userImage = clientDetails?.image || null;
				userName = clientDetails?.name || null;
				userId = clientDetails?.id || null;
				userRole = "client";
				userNotifications = clientDetails?.ClientNotification || [];
			}
		} catch (error) {
			console.error("Error fetching user details:", error);
		}
	}

	return (
		<html lang="en">
			<body>
				<Providers session={session}>
					<NavBar userImage={userImage} userName={userName} userId={userId} userRole={userRole} userNotifications={userNotifications} />
					{children}
				</Providers>
			</body>
		</html>
	);
}

"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Assignment, Client, Tutor } from "@prisma/client";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Picked } from "./picked";
import { Update } from "./update";
import { Request } from "./request";
import { Paid } from "./paid";
import Image from "next/image";
import Nothing from "@/components/ui/Nothing";

type TutorNotification = {
	id: number;
	assignment: Assignment;
	client: Client;
	tutor: Tutor;
	date: string;
	message: string;
	read: boolean;
	type: string;
};

type NotificationsProps = {
	tutorId: number;
	notifs: TutorNotification[];
};

export const Notifications: React.FC<NotificationsProps> = ({ tutorId, notifs }) => {
	const [notifications, setNotifications] = useState<TutorNotification[]>(notifs);
	const [sortedNotifications, setSortedNotifications] = useState<TutorNotification[]>(notifs);
	const [sortBy, setSortBy] = useState<"unread" | "newest">("newest");
	const [page, setPage] = useState(1);
	const totalPages = Math.ceil(notifs.length / 10);
	const limit = 10;
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(limit);

	useEffect(() => {
		let sorted;
		if (sortBy === "newest") {
			sorted = [...notifications].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		} else if (sortBy === "unread") {
			sorted = [...notifications].sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1));
		}
		if (sorted) {
			setSortedNotifications(sorted);
		}
	}, [sortBy, notifications]);

	const markNotificationAsRead = async (notificationId: number) => {
		try {
			const response = await fetch("/api/tutor/notifications/markAsRead", {
				method: "PUT",
				body: JSON.stringify({
					notificationId,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("Failed to mark notification as read");
			}
			setNotifications((prevNotifications) =>
				prevNotifications.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif))
			);
			setSortedNotifications((prevNotifications) =>
				prevNotifications.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif))
			);
		} catch (error) {
			console.error("Error marking notification as read:", error);
		}
	};

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(page - 1);
			setStartIndex(startIndex - limit);
			setEndIndex(endIndex - limit);
		}
	};

	const handleNextPage = () => {
		if (page < totalPages) {
			setPage(page + 1);
			setStartIndex(startIndex + limit);
			setEndIndex(endIndex + limit);
		}
	};

	const styles = {
		title: {
			font: "Poppins",
			fontSize: "32px",
			textAlign: "center" as "center",
			fontWeight: "bold",
			padding: "20px",
		},
		container: {
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "20px",
			width: "70%",
		},
		main: {
			display: "flex",
			justifyContent: "center",
			alignItems: "flex-start",
			flex: "1",
		},
		sortSection: {
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "center",
			padding: "10px 0 20px 20px",
			width: "100%",
			borderBottom: "1px solid #5790AB",
			marginBottom: "10px",
		},
		sortText: {
			fontSize: "20px",
			fontWeight: "bold" as "bold",
			font: "Poppins",
			marginRight: "20px",
			alignItems: "center",
			display: "flex",
		},
		activeButton: {
			backgroundColor: "#5790AB",
			color: "#fff",
			padding: "10px 20px",
			borderRadius: "5px",
			marginRight: "10px",
			cursor: "pointer",
			fontSize: "16px",
			fontWeight: "bold",
		},
		inactiveButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			padding: "10px 20px",
			borderRadius: "5px",
			marginRight: "10px",
			border: "1px solid #5790AB",
			fontSize: "16px",
			fontWeight: "bold",
		},
		settingsButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			borderRadius: "5px",
			marginLeft: "auto",
		},
		icon: {
			width: "20px",
			height: "20px",
		},
	};

	return (
		<div style={styles.main}>
			<div style={styles.container}>
				<h1 style={styles.title}>
					My Notifications{" "}
					{sortedNotifications.filter((notif) => !notif.read).length > 0 &&
						`(${sortedNotifications.filter((notif) => !notif.read).length})`}
				</h1>
				<div style={styles.sortSection}>
					<div style={styles.sortText}>Sort by:</div>
					<Button style={sortBy == "newest" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("newest")}>
						Newest
					</Button>
					<Button style={sortBy == "unread" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("unread")}>
						Unread
					</Button>
					<Button style={styles.settingsButton} onClick={() => console.log("Settings clicked")}>
						<Image src="/images/settings.png" alt="Settings" width={20} height={20} style={styles.icon} />
					</Button>
				</div>
				{sortedNotifications.length === 0 && (
					<Nothing message={"No Notifications."} imageSrc={"/images/Notification.png"} imageAlt={"Notification"} />
				)}
				{sortedNotifications.map((notif) => (
					<div key={notif.id} style={{ marginTop: "10px", width: "100%" }}>
						{notif.type === "picked" && (
							<Picked
								tutorId={tutorId}
								client={notif.client}
								assignment={notif.assignment}
								date={notif.date}
								markAsRead={markNotificationAsRead}
								notificationId={notif.id}
								read={notif.read}
							/>
						)}
						{notif.type === "request" && (
							<Request
								tutorId={tutorId}
								client={notif.client}
								assignment={notif.assignment}
								date={notif.date}
								markAsRead={markNotificationAsRead}
								notificationId={notif.id}
								read={notif.read}
							/>
						)}
						{notif.type === "update" && (
							<Update
								tutorId={tutorId}
								date={notif.date}
								markAsRead={markNotificationAsRead}
								notificationId={notif.id}
								read={notif.read}
							/>
						)}
						{notif.type === "paid" && (
							<Paid
								tutorId={tutorId}
								client={notif.client}
								assignment={notif.assignment}
								date={notif.date}
								markAsRead={markNotificationAsRead}
								notificationId={notif.id}
								read={notif.read}
							/>
						)}
					</div>
				))}
				<Pagination style={{ padding: "10px", fontSize: "16px" }}>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious onClick={handlePreviousPage} />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink>{page}</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext onClick={handleNextPage} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};

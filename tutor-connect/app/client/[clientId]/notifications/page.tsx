"use client";

import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Assignment, Client, Tutor } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Loading from "@/app/loading";
import { Apply } from "./apply";
import { Payment } from "./payment";
import { Matched } from "./matched";

type ClientNotification = {
	id: number;
	assignment: Assignment;
	client: Client;
	tutor: Tutor;
	date: string;
	message: string;
	read: boolean;
};

export default function MyReviews() {
	const [notifications, setNotifications] = useState<ClientNotification[]>([]);
	const [sortedNotifications, setSortedNotifications] = useState<ClientNotification[]>([]);
	const [sortBy, setSortBy] = useState<"unread" | "newest">("newest");
	const [notificationSearch, setNotificationSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 10;
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(limit);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const params = useParams();
	const clientId = params.clientId;
	const router = useRouter();

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const notifications = await fetch("/api/client/notifications/getNotifications", {
					method: "POST",
					body: JSON.stringify({
						clientId: clientId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (notifications.ok) {
					const notificationsData = await notifications.json();
					setNotifications(notificationsData.notifications);
					setSortedNotifications(notificationsData.notifications);
					setTotalPages(Math.ceil(notificationsData.notifications.length / limit));
				} else {
					console.error("Failed to fetch notifications");
				}
			} catch (error) {
				console.error("Error fetching client details:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchReviews();
	}, [clientId]);

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
			border: "1px solid #5790AB",
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
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div style={styles.main}>
				<div style={styles.container}>
					<h1 style={styles.title}>My Notifications ({sortedNotifications.length})</h1>
					<div style={styles.sortSection}>
						<p style={styles.sortText}>Sort by:</p>
						<Button style={sortBy == "newest" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("newest")}>
							Newest
						</Button>
						<Button style={sortBy == "unread" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("unread")}>
							Unread
						</Button>
						<Button style={styles.settingsButton} onClick={() => console.log("Settings clicked")}>
							<img src="/images/settings.png" style={styles.icon} />
						</Button>
					</div>
					{loading && <Loading />}
					{sortedNotifications.map((notif) => (
						<>
							<div style={{ marginTop: "10px", width: "100%" }}>
								<Apply clientId={clientId} tutor={notif.tutor} assignment={notif.assignment} date={notif.date} />
							</div>
							<div style={{ marginTop: "10px", width: "100%" }}>
								<Matched clientId={clientId} tutor={notif.tutor} assignment={notif.assignment} date={notif.date} />
							</div>
							<div style={{ marginTop: "10px", width: "100%" }}>
								<Payment clientId={clientId} tutor={notif.tutor} assignment={notif.assignment} date={notif.date} />
							</div>
						</>
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
			<Footer />
		</div>
	);
}

"use client";

import { Button } from "@/components/ui/button";
import { Assignment, Client } from "@prisma/client";
import { useRouter } from "next/navigation";

type RequestProps = {
	tutorId: string | string[];
	client: Client;
	assignment: Assignment;
	date: string;
	markAsRead: (notificationId: number) => void;
	notificationId: number;
	read: boolean;
};

export const Request: React.FC<RequestProps> = ({ tutorId, client, assignment, date, markAsRead, notificationId, read }) => {
	const router = useRouter();

	const handleClick = () => {
		markAsRead(notificationId);
	};

	const assignmentButton = () => {
		router.push(`/tutor/${tutorId}/my_assignments`);
	};

	const styles = {
		card: {
			display: "flex",
			width: "100%",
			border: "1px solid #5790AB",
			borderRadius: "10px",
			padding: "10px 20px 10px 20px",
			marginBottom: "20px",
			alignItems: "center",
		},
		circle: {
			width: "10px",
			height: "10px",
			borderRadius: "50%",
			backgroundColor: "#5790AB",
			marginRight: "20px",
		},
		empty: {
			width: "10px",
			height: "10px",
			borderRadius: "50%",
			backgroundColor: "#fff",
			marginRight: "20px",
		},
		title: {
			font: "Poppins",
			fontSize: "18px",
			textAlign: "left" as "left",
		},
		description: {
			font: "Poppins",
			fontSize: "16px",
			textAlign: "left" as "left",
			color: "#5790AB",
			marginTop: "2px",
		},
		blueButton: {
			backgroundColor: "#5790AB",
			color: "#fff",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "200px",
		},
		whiteButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			border: "1px solid #5790AB",
			width: "200px",
		},
		buttonSection: {
			display: "flex",
			flexDirection: "row" as "row",
			gap: "10px",
			marginTop: "10px",
		},
		dateText: {
			font: "Poppins",
			fontSize: "17px",
			color: "#5790AB",
			marginLeft: "auto",
		},
	};

	return (
		<div style={styles.card} onClick={handleClick}>
			<div style={read ? styles.empty : styles.circle}></div>
			<div>
				<h1 style={styles.title}>A <strong>client</strong> is interested in your tutoring services.</h1>
				<p style={styles.description}>Click below to view the assignment details and make your decision within 2 days.</p>
				<div style={styles.buttonSection}>
					<Button style={styles.blueButton} onClick={assignmentButton}>
						View Assignment
					</Button>
				</div>
			</div>
			<p style={styles.dateText}>
				{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date))}
			</p>
		</div>
	);
};

"use client";

import { Button } from "@/components/ui/button";
import { Tutor, Assignment } from "@prisma/client";
import { useRouter } from "next/navigation";

type MatchedProps = {
	clientId: number;
	tutor: Tutor;
	assignment: Assignment;
	date: string;
	markAsRead: (notificationId: number) => void;
	notificationId: number;
	read: boolean;
};

export const Matched: React.FC<MatchedProps> = ({ clientId, tutor, assignment, date, markAsRead, notificationId, read }) => {
	const router = useRouter();

    const handleClick = () => {
		markAsRead(notificationId);
	};

	const payButton = () => {
		router.push(`/client/${clientId}/assignment/${assignment.id}/view_assignment/payment_form`);
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
			width: "150px",
		},
		whiteButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			border: "1px solid #5790AB",
			width: "150px",
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
				<h1 style={styles.title}>
					<strong>{tutor.name}</strong> has accepted your offer for Assignment #{assignment.id}.
				</h1>
				<p style={styles.description}>Please proceed to make payment for the one-time matchmaking fee.</p>
				<div style={styles.buttonSection}>
					<Button style={styles.blueButton} onClick={payButton}>
						Pay
					</Button>
				</div>
			</div>
			<p style={styles.dateText}>
				{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date))}
			</p>
		</div>
	);
};

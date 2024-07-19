"use client";

import { Button } from "@/components/ui/button";
import { Client, Assignment } from "@prisma/client";
import { useRouter } from "next/navigation";

type UpdateProps = {
	tutorId: string | string[];
	date: string;
	markAsRead: (notificationId: number) => void;
	notificationId: number;
	read: boolean;
};

export const Update: React.FC<UpdateProps> = ({ tutorId, date, markAsRead, notificationId, read }) => {
	const router = useRouter();

	const handleClick = () => {
		markAsRead(notificationId);
	};

	const updateButton = () => {
		router.push(`/tutor/${tutorId}/settings/profile`);
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
		empty: {
			width: "10px",
			height: "10px",
			borderRadius: "50%",
			backgroundColor: "#fff",
			marginRight: "20px",
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
					<strong>Update your profile</strong> now!
				</h1>
				<p style={styles.description}>Showcase your skills to stand out and increase your chances of getting selected by clients.</p>
				<div style={styles.buttonSection}>
					<Button style={styles.blueButton} onClick={updateButton}>
						Update Profile
					</Button>
				</div>
			</div>
			<p style={styles.dateText}>
				{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date))}
			</p>
		</div>
	);
};

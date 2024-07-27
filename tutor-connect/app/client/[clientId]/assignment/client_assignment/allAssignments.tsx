"use client";

import { Button } from "@/components/ui/button";
import Nothing from "@/components/ui/Nothing";
import { useRouter } from "next/navigation";

interface Assignment {
	id: number;
	subject: string;
	level: string;
	address: string;
	unitNumber: string;
	postalCode: number;
	minRate: number;
	maxRate: number;
	duration: string;
	frequency: string;
	additionalDetails: string;
	typeOfTutor: string[];
	gender: string;
	race: string[];
	availability: string;
	postDate: string;
	taken: boolean;
	client: {
		id: number;
		name: string;
	};
	tutorId: number;
	isPaid: boolean;
	amount: number;
}

type AllAssignmentsProps = {
	assignments: Assignment[];
    clientId: number;
};

export const AllAssignments: React.FC<AllAssignmentsProps> = ({ assignments, clientId }) => {
    const router = useRouter();

    const styles = {
		blueButton: {
			backgroundColor: "#5790AB",
			color: "#fff",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "100%",
			marginTop: "10px",
		},
		whiteButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "100%",
			border: "1px solid #5790AB",
			marginTop: "10px",
		},
		confirmed: {
			color: "#dd0000",
		},
		pending: {
			color: "#FFA500",
		},
		available: {
			color: "#00cc00",
		},
		text: {
			fontSize: "16px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#000",
			textAlign: "justify" as "justify",
		},
		emptySection: {
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "20px",
			width: "100%",
		},
		arrowIcon: {
			marginLeft: "10px",
			width: "24px",
			height: "24px",
			fill: "white",
			transform: "rotate(180deg)",
		},
		none: {
			fontSize: "24px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#909090",
			padding: "20px",
		},
	};

    return (
        <div className="container mx-auto p-6 flex flex-col items-center flex-grow">
				<h1 className="text-4xl font-bold mb-8 text-center">My Assignments</h1>
				{assignments.length === 0 ? (
					<Nothing message={"No assignments yet"} imageSrc={"/images/Assignment.png"} imageAlt={"Assignmnet"} />
				) : (
					<div className="grid grid-cols-1 gap-8">
						{assignments.map((assignment) => (
							<div key={assignment.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full max-w-6xl">
								<h2 className="text-2xl font-semibold mb-2">
									{assignment.level} {assignment.subject}
								</h2>
								<p className="text-gray-700 mb-1">
									<strong>Address:</strong> {assignment.address}, {assignment.unitNumber && `${assignment.unitNumber}, `}Singapore{" "}
									{assignment.postalCode}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Frequency:</strong> {assignment.duration}, {assignment.frequency}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Hourly Rate:</strong>{" "}
									{assignment.amount ? `$${assignment.amount}` : `$${assignment.minRate} - $${assignment.maxRate}`}
								</p>
								{assignment.additionalDetails && (
									<p className="text-gray-700 mb-1">
										<strong>Additional Details:</strong> {assignment.additionalDetails}
									</p>
								)}
								<p className="text-gray-700 mb-1">
									<strong>Available on:</strong> {assignment.availability}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Post Date:</strong> {new Date(assignment.postDate).toLocaleDateString("en-gb")}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Client:</strong> {assignment.client.name}
								</p>
								<p
									style={{
										...styles.text,
										...(assignment.taken && assignment.tutorId
											? assignment.isPaid
												? styles.confirmed
												: styles.pending
											: styles.available),
									}}
								>
									<strong>Status:</strong>{" "}
									{assignment.taken && assignment.tutorId ? (assignment.isPaid ? "Taken" : "Pending Payment") : "Available"}
								</p>
								<Button
									style={styles.blueButton}
									onClick={() => {
										router.push(`/client/${clientId}/assignment/${assignment.id}/view_assignment`);
									}}
								>
									View Assignment
								</Button>
							</div>
						))}
					</div>
				)}
				<Button
					style={{ ...styles.blueButton, width: "25%", marginTop: "20px" }}
					onClick={() => {
						router.push(`/client/${clientId}/post_assignments`);
					}}
				>
					Post an Assignment here!{" "}
					<svg style={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M12 2l1.41 1.41L5.83 11H22v2H5.83l7.58 7.59L12 22 2 12 12 2z" />
					</svg>
				</Button>
			</div>
    )
}
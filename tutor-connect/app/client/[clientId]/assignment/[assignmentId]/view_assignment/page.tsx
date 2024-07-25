"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/navBar";
import { Button } from "@/components/ui/button";

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

//TODO: Change to update assignment details only and only accept possible clientId
export default function ViewAssignment() {
	const router = useRouter();
	const params = useParams();
	const assignmentId = params.assignmentId;
	const clientId = params.clientId;
	const [assignments, setAssignments] = useState<Assignment[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [error2, setError2] = useState<string | null>(null);

	async function accept_assignment(assignment: Assignment) {
		try {
			if (clientId != null) {
				router.push(`/client/${clientId}/assignment/${assignmentId}/view_assignment/avail_tutors`);
			} else {
				setError2("Client ID is required");
			}
		} catch (error: any) {
			setError(error?.message);
		}
	}

	async function tutorInfo(assignment: Assignment) {
		router.push(`/client/${clientId}/view_tutors/${assignment.tutorId}/tutor_profile`);
	}

	async function edit_assignment(assignment: Assignment) {
		try {
			if (clientId != null) {
				router.push(`/client/${clientId}/assignment/${assignmentId}/edit_assignment`);
			} else {
				setError2("Client ID is required");
			}
		} catch (error: any) {
			setError(error?.message);
		}
	}

	useEffect(() => {
		async function fetchAssignments() {
			try {
				const res = await fetch("/api/assignments");
				const contentType = res.headers.get("content-type");
				if (!res.ok) {
					const errorData = await res.json();
					setError(errorData.error || "Failed to fetch assignments");
					return;
				}

				if (contentType && contentType.includes("application/json")) {
					const data = await res.json();
					setAssignments(data);
				} else {
					setError("Unexpected content type: " + contentType);
				}
			} catch (err: any) {
				setError(err.message);
			}
		}

		fetchAssignments();
	}, []);

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

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
		buttonSection: {
			display: "flex",
			flexDirection: "row" as "row",
			justifyContent: "space-between",
			width: "100%",
			gap: "10px",
		},
	};

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="container mx-auto p-6 flex flex-col items-center flex-grow">
				<h1 className="text-4xl font-bold mb-8 text-center">Tutee Assignment</h1>
				{assignments.length === 0 ? (
					<p className="text-gray-500 text-center">No assignments available.</p>
				) : (
					<div className="grid grid-cols-1 gap-8">
						{assignments
							.filter((assignment) => assignment.id.toString() === assignmentId)
							.map((assignment) => (
								<div
									key={assignment.id}
									className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full max-w-6xl"
								>
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
									{/* Do Boolean check to see if the tutor is matched */}
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
									<div style={styles.buttonSection}>
										{!assignment.taken && (
											<>
												<Button style={styles.blueButton} onClick={() => edit_assignment(assignment)}>
													Edit
												</Button>
												<Button style={styles.whiteButton} onClick={() => accept_assignment(assignment)}>
													View Tutors
												</Button>
											</>
										)}
										{assignment.taken && (
											<>
												<Button style={styles.blueButton} onClick={() => tutorInfo(assignment)}>
													Tutor Info
												</Button>
												{!assignment.isPaid && (
													<Button
														style={styles.whiteButton}
														onClick={() =>
															router.push(`/client/${clientId}/assignment/${assignmentId}/view_assignment/payment_form`)
														}
													>
														Make Payment
													</Button>
												)}
											</>
										)}
									</div>
									{error2 && <Alert>{error2}</Alert>}
								</div>
							))}
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}

"use client";

import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Assignment } from "@prisma/client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/customTabs";

export default function MyReviews() {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [offeredAssignments, setOfferedAssignments] = useState<Assignment[]>([]);
	const [appliedAssignments, setAppliedAssignments] = useState<Assignment[]>([]);
	const [acceptedAssignments, setAcceptedAssignments] = useState<Assignment[]>([]);
	const params = useParams();
	const tutorId = params.tutorId;
	const router = useRouter();

	useEffect(() => {
		async function fetchAssignments() {
			try {
				const offered = await fetch("/api/tutor/getAssignments", {
					method: "POST",
					body: JSON.stringify({
						tutorId: tutorId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!offered.ok) {
					const errorData = await offered.json();
					setError(errorData.error || "Failed to fetch assignments");
					return;
				}

				const applied = await fetch("/api/tutor/appliedAssignments", {
					method: "POST",
					body: JSON.stringify({
						tutorId: tutorId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!applied.ok) {
					const errorData = await applied.json();
					setError(errorData.error || "Failed to fetch assignments");
					return;
				}
				const offeredData = await offered.json();
				const appliedData = await applied.json();
				const offeredAssignments = offeredData.assignments.filter((assignment: Assignment) => !assignment.isPaid && !assignment.taken);
				const appliedAssignments = appliedData.assignments.filter((assignment: Assignment) => !assignment.taken);
				const acceptedAssignments = offeredData.assignments.filter((assignment: Assignment) => assignment.taken);
				setOfferedAssignments(offeredAssignments);
				setAppliedAssignments(appliedAssignments);
				setAcceptedAssignments(acceptedAssignments);
			} catch (error) {
				console.error("Error fetching assignments:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchAssignments();
	}, [tutorId]);

	const findAssignments = () => {
		router.push(`/tutor/${tutorId}/view_assignments`);
	};

	const acceptButton = async (assignment: Assignment) => {
		try {
			const response = await fetch("/api/tutor/acceptOffer", {
				method: "POST",
				body: JSON.stringify({
					tutorId: tutorId,
					assignmentId: assignment.id,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("Failed to accept assignment");
			}

			const notif = await fetch("/api/client/notifications/createMatchedNotification", {
				method: "POST",
				body: JSON.stringify({
					assignmentId: assignment.id,
					tutorId,
					clientId: assignment.clientId,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			alert("Assignment accepted successfully");
			const updatedAssignments = offeredAssignments.filter((a) => a.id !== assignment.id);
			setOfferedAssignments(updatedAssignments);
		} catch (error) {
			console.error("Error accepting assignment:", error);
		}
	};

	const rejectButton = async (assignment: Assignment) => {
		try {
			const response = await fetch("/api/tutor/rejectAssignment", {
				method: "POST",
				body: JSON.stringify({
					tutorId: tutorId,
					assignmentId: assignment.id,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("Failed to reject assignment");
			}

			const notif = await fetch("/api/client/notifications/createRejectNotification", {
				method: "POST",
				body: JSON.stringify({
					assignmentId: assignment.id,
					tutorId,
					clientId: assignment.clientId,
					request: assignment.isRequest ? "requestRejected" : "offerRejected",
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!notif.ok) {
				throw new Error("Failed to send notification");
			}
			alert("Assignment rejected successfully");
			const updatedAssignments = offeredAssignments.filter((a) => a.id !== assignment.id);
			setOfferedAssignments(updatedAssignments);
		} catch (error) {
			console.error("Error rejecting assignment:", error);
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
		noOffer: {
			fontSize: "24px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#909090",
			padding: "20px",
		},
		blueButton: {
			backgroundColor: "#5790AB",
			color: "#fff",
			padding: "10px 20px",
			borderRadius: "5px",
			fontSize: "16px",
			marginRight: "10px",
			fontWeight: "bold",
		},
		whiteButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			padding: "10px 20px",
			borderRadius: "5px",
			border: "1px solid #5790AB",
			fontSize: "16px",
			marginRight: "10px",
			fontWeight: "bold",
		},
		rejectButton: {
			backgroundColor: "#FF0000",
			color: "#fff",
			padding: "10px 20px",
			borderRadius: "5px",
			border: "1px solid #FF0000",
			fontSize: "16px",
			fontWeight: "bold",
		},
		assignmentContainer: {
			display: "flex",
			flexDirection: "column" as "column",
			padding: "10px 20px 10px 20px",
			width: "100%",
			borderRadius: "10px",
			marginBottom: "20px",
			border: "1px solid #5790AB",
		},
		assignmentTitle: {
			fontSize: "24px",
			fontWeight: "bold" as "bold",
			font: "Poppins",
		},
		assignmentNum: {
			fontSize: "16px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#909090",
		},
		text: {
			fontSize: "16px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#000",
			textAlign: "justify" as "justify",
		},
		buttons: {
			marginLeft: "auto",
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
		confirmed: {
			color: "#00cc00",
		},
		pending: {
			color: "#FFA500",
		},
	};
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div style={styles.main}>
				<div style={styles.container}>
					<h1 style={styles.title}>My Assignments</h1>
					<div style={{ width: "100%" }}>
						<Tabs defaultValue="offers">
							<TabsList
								className="grid w-full grid-cols-3"
								style={{ marginBottom: "20px", backgroundColor: "#eff8fa", color: "#5790AB" }}
							>
								<TabsTrigger value="accepted" className="font-xl">
									Accepted
								</TabsTrigger>
								<TabsTrigger value="offers" className="font-xl">
									Offers
								</TabsTrigger>
								<TabsTrigger value="applied">Applied</TabsTrigger>
							</TabsList>
							<TabsContent value="accepted">
								{loading && <Loading />}
								{acceptedAssignments.length === 0 && !loading && (
									<div style={styles.emptySection}>
										<Image
											src="/images/Assignment.png"
											alt="Assignment"
											width={150}
											height={150}
											quality={100}
											style={{
												width: "150px",
												height: "150px",
											}}
										/>
										<p style={styles.noOffer}>No accepted assignments yet.</p>
										<Button style={styles.blueButton} onClick={findAssignments}>
											Find Assignments{" "}
											<svg style={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
												<path d="M12 2l1.41 1.41L5.83 11H22v2H5.83l7.58 7.59L12 22 2 12 12 2z" />
											</svg>
										</Button>
									</div>
								)}
								{acceptedAssignments.length > 0 && !loading && (
									<div>
										{acceptedAssignments.map((assignment: Assignment) => (
											<div key={assignment.id} style={styles.assignmentContainer}>
												<div style={{ display: "flex" }}>
													<div>
														<h2 style={styles.assignmentTitle}>
															{assignment.level} {assignment.subject}
														</h2>
													</div>
												</div>
												<p style={styles.assignmentNum}>Assignment #{assignment.id}</p>
												<p style={styles.text}>
													<strong>Address: </strong>
													{assignment.address}, Singapore {assignment.postalCode}
												</p>
												<p style={styles.text}>
													<strong>Rate: </strong>${assignment.amount}/h
												</p>
												<p style={styles.text}>
													<strong>Duration and Frequency: </strong>
													{assignment.duration}, {assignment.frequency}
												</p>
												<p style={styles.text}>
													<strong>Earliest Start: </strong>
													{assignment.startDate}
												</p>
												{assignment.additionalDetails && (
													<p style={styles.text}>
														<strong>Additional Details: </strong>
														{assignment.additionalDetails}
													</p>
												)}
												<p style={{ ...styles.text, ...(assignment.isPaid ? styles.confirmed : styles.pending) }}>
													<strong>Status: </strong>
													{assignment.isPaid ? "Confirmed" : "Pending Client's payment"}
												</p>
											</div>
										))}
									</div>
								)}
							</TabsContent>
							<TabsContent value="offers">
								{loading && <Loading />}
								{offeredAssignments.length === 0 && !loading && (
									<div style={styles.emptySection}>
										<Image
											src="/images/Offer.png"
											alt="Offer"
											width={150}
											height={150}
											quality={100}
											style={{
												width: "150px",
												height: "150px",
											}}
										/>
										<p style={styles.noOffer}>No offers yet.</p>
										<Button style={styles.blueButton} onClick={findAssignments}>
											Find Assignments{" "}
											<svg style={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
												<path d="M12 2l1.41 1.41L5.83 11H22v2H5.83l7.58 7.59L12 22 2 12 12 2z" />
											</svg>
										</Button>
									</div>
								)}
								{offeredAssignments.length > 0 && !loading && (
									<div>
										{offeredAssignments.map((assignment: Assignment) => (
											<div key={assignment.id} style={styles.assignmentContainer}>
												<div style={{ display: "flex" }}>
													<div>
														<h2 style={styles.assignmentTitle}>
															{assignment.level} {assignment.subject}
														</h2>
													</div>
													<div style={styles.buttons}>
														<Button style={styles.whiteButton} onClick={() => acceptButton(assignment)}>
															Accept
														</Button>
														<Button style={styles.rejectButton} onClick={() => rejectButton(assignment)}>
															Reject
														</Button>
													</div>
												</div>
												<p style={styles.assignmentNum}>Assignment #{assignment.id}</p>
												<p style={styles.text}>
													<strong>Address: </strong>
													{assignment.address}, Singapore {assignment.postalCode}
												</p>
												<p style={styles.text}>
													<strong>Rate: </strong>${assignment.amount}/h
												</p>
												<p style={styles.text}>
													<strong>Duration and Frequency: </strong>
													{assignment.duration}, {assignment.frequency}
												</p>
												<p style={styles.text}>
													<strong>Earliest Start: </strong>
													{assignment.startDate}
												</p>
												{assignment.additionalDetails && (
													<p style={styles.text}>
														<strong>Additional Details: </strong>
														{assignment.additionalDetails}
													</p>
												)}
											</div>
										))}
									</div>
								)}
							</TabsContent>
							<TabsContent value="applied">
								{loading && <Loading />}
								{appliedAssignments.length === 0 && !loading && (
									<div style={styles.emptySection}>
										<Image
											src="/images/Application.png"
											alt="Application"
											width={150}
											height={150}
											quality={100}
											style={{
												width: "150px",
												height: "150px",
											}}
										/>
										<p style={styles.noOffer}>No applications yet.</p>
										<Button style={styles.blueButton} onClick={findAssignments}>
											Find Assignments{" "}
											<svg style={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
												<path d="M12 2l1.41 1.41L5.83 11H22v2H5.83l7.58 7.59L12 22 2 12 12 2z" />
											</svg>
										</Button>
									</div>
								)}
								{appliedAssignments.length > 0 && !loading && (
									<div>
										{appliedAssignments.map((assignment: Assignment) => (
											<div>
												{offeredAssignments.map((assignment: Assignment) => (
													<div key={assignment.id} style={styles.assignmentContainer}>
														<h2 style={styles.assignmentTitle}>
															{assignment.level} {assignment.subject}
														</h2>
														<p style={styles.assignmentNum}>Assignment #{assignment.id}</p>
														<p style={styles.text}>
															<strong>Address: </strong>
															{assignment.address}, Singapore {assignment.postalCode}
														</p>
														<p style={styles.text}>
															<strong>Rate: </strong>${assignment.minRate} - {assignment.maxRate}/h
														</p>
														<p style={styles.text}>
															<strong>Duration and Frequency: </strong>
															{assignment.duration}, {assignment.frequency}
														</p>
														<p style={styles.text}>
															<strong>Availability: </strong>
															{assignment.availability}
														</p>
														{assignment.additionalDetails && (
															<p style={styles.text}>
																<strong>Additional Details: </strong>
																{assignment.additionalDetails}
															</p>
														)}
													</div>
												))}
											</div>
										))}
									</div>
								)}
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

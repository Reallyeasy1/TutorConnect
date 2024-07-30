"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";
import { useEffect, useRef, useState } from "react";
import Loading from "@/app/loading";
import CheckoutPage from "./checkout_page";
import Logo from "@/components/nav-bar/logo";
import { Assignment } from "@prisma/client";

export default function Payment() {
	const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
	const params = useParams();
	const clientId = params.clientId;
	const assignmentId = params.assignmentId;
	const [assignments, setAssignments] = useState<Assignment | null>(null);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const alertShown = useRef(false);

	if (stripePublishableKey === undefined) {
		throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
	}

	const stripePromise = loadStripe(stripePublishableKey);

	useEffect(() => {
		async function fetchAssignments() {
			try {
				const res = await fetch("/api/getAssignment", {
					method: "POST",
					body: JSON.stringify({
						assignmentId: assignmentId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!res.ok) {
					const errorData = await res.json();
					setError(errorData.error || "Failed to fetch assignments");
					return;
				}

				const data = await res.json();

				if (data.assignments.isPaid) {
					if (!alertShown.current) {
						alertShown.current = true;
						alert("Assignment has already been paid for");
						router.push(`/client/${clientId}/assignment/${assignmentId}/view_assignment`);
						return;
					}
				}

				setAssignments(data.assignments);
			} catch (err: any) {
				setError(err.message);
			}
		}

		fetchAssignments();
	}, [assignmentId, clientId, router]);

	const fee = assignments && assignments.amount ? assignments.amount * parseFloat(assignments.duration.split("h")[0]) * 2 : 0.5;

	const styles = {
		main: {
			display: "flex",
			justifyContent: "center",
			flex: "1",
			flexDirection: "column" as "column",
		},
		header: {
			font: "Poppins",
			fontSize: "30px",
			fontWeight: "bold",
			textAlign: "center" as "center",
			padding: "20px 20px 0 20px",
		},
		container: {
			display: "flex",
			flexDirection: "row" as "row",
			border: "1px solid #5790AB",
			borderRadius: "20px",
			maxWidth: "800px",
			margin: "20px auto",
			width: "55%",
		},
		details: {
			flex: 1,
			padding: "30px",
			borderRight: "1px solid #5790AB",
			backgroundColor: "#eff8fa",
			borderRadius: "20px 0 0 20px",
		},
		payment: {
			flex: 1,
			padding: "30px",
			display: "flex",
			flexDirection: "column" as "column",
			alignItems: "center",
		},
		title: {
			fontSize: "28px",
			fontWeight: "bold",
			marginBottom: "20px",
			color: "#5790AB",
			display: "flex",
			alignItems: "center",
			gap: "8px",
			fontFamily: "Poppins",
			justifyContent: "center",
		},
		assignmentHeader: {
			fontSize: "20px",
			fontWeight: "bold",
			font: "Poppins",
			marginBottom: "3px",
		},
		assignmentDetails: {
			fontSize: "16px",
			font: "Poppins",
			marginBottom: "3px",
		},
		fee: {
			display: "flex",
			justifyContent: "space-between",
			padding: "20px 0 10px 0",
			fontWeight: "bold",
			borderBottom: "1px solid #ddd",
			fontSize: "16px",
		},
		total: {
			display: "flex",
			justifyContent: "space-between",
			marginTop: "10px",
			fontSize: "20px",
			fontWeight: "bold",
		},
		paymentOption: {
			display: "flex",
			justifyContent: "space-between",
			width: "100%",
			marginBottom: "20px",
		},
		card: {
			border: "1px solid #d3e2f4",
			padding: "20px",
			borderRadius: "5px",
			width: "100%",
		},
		input: {
			width: "100%",
			padding: "10px",
			marginBottom: "10px",
			borderRadius: "5px",
			border: "1px solid #d3e2f4",
		},
		button: {
			backgroundColor: "black",
			color: "white",
			padding: "10px 20px",
			borderRadius: "5px",
			cursor: "pointer",
			width: "100%",
			border: "none",
		},
		paymentButton: {
			backgroundColor: "white",
			color: "black",
			flex: 1,
			margin: "0 5px",
			padding: "10px",
			borderRadius: "5px",
			border: "1px solid black",
		},
	};

	return (
		<div className="flex flex-col min-h-screen">
			<div style={styles.main}>
				<h1 style={styles.header}>Payment Page</h1>
				{!assignments && <Loading />}
				{assignments && !assignments.isPaid && (
					<div style={styles.container}>
						<div style={styles.details}>
							<div style={styles.title}>
								<Logo />
								TutorConnect
							</div>
							{/* TODO: Add assignment details */}

							<div key={assignments.id}>
								<div style={styles.assignmentHeader}>Assignment ID: {assignments.id}</div>
								<p style={styles.assignmentDetails}>
									<strong>Subject: {assignments.subject}</strong>
								</p>
								<p style={styles.assignmentDetails}>
									<strong>Rate:</strong> ${assignments.amount}/h
								</p>
								<p style={styles.assignmentDetails}>
									<strong>Duration:</strong> {assignments.duration}
								</p>
								<p style={styles.assignmentDetails}>
									<strong>Frequency:</strong> {assignments.frequency}
								</p>
								<div style={styles.fee}>
									<span>Matchmaking Fee</span>
									<span>${fee}</span>
								</div>
								<div style={styles.total}>
									<span>Total Due</span>
									<span>${fee}</span>
								</div>
							</div>
						</div>
						<div style={styles.payment}>
							<Elements
								stripe={stripePromise}
								options={{
									mode: "payment",
									amount: convertToSubcurrency(fee),
									currency: "sgd",
									payment_method_types: ["paynow", "card"],
								}}
							>
								<CheckoutPage amount={fee} clientId={clientId} assignmentId={assignmentId} tutorId={assignments.tutorId as number} />
							</Elements>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}

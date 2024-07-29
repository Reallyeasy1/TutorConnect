"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CheckoutPage = ({
	amount,
	clientId,
	assignmentId,
	tutorId,
}: {
	amount: number;
	clientId: string | string[];
	assignmentId: string | string[];
	tutorId: number;
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string>();
	const [clientSecret, setClientSecret] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/create-payment-intent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [amount]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) {
			setErrorMessage("Stripe or elements not initialized.");
			setLoading(false);
			return;
		}

		try {
			const { error: submitError } = await elements.submit();

			if (submitError) {
				setErrorMessage(submitError.message);
				setLoading(false);
				return;
			}

			const { error, paymentIntent } = await stripe.confirmPayment({
				elements,
				clientSecret,
				confirmParams: {
					return_url: `https://tutorconnect-delta.vercel.app/client/${clientId}/assignment/${assignmentId}/view_assignment/payment_success?amount=${amount}&tutorId=${tutorId}`,
				},
				redirect: "if_required",
			});

			if (error) {
				// This point is only reached if there's an immediate error when
				// confirming the payment. Show the error to your customer (for example, payment details incomplete)
				setErrorMessage(error.message);
				setLoading(false);
				return;
			}

			if (paymentIntent && paymentIntent.status === "succeeded") {
				// Update payment status
				const update = await fetch("/api/updatePayment", {
					method: "POST",
					body: JSON.stringify({
						assignmentId: assignmentId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!update.ok) {
					const updateError = await update.json();
					throw new Error(updateError.error || "Failed to update payment status");
				}

				console.log("Payment status updated, sending notification...");

				const clientNotif = await fetch("/api/client/notifications/createPaidNotification", {
					method: "POST",
					body: JSON.stringify({
						clientId: clientId,
						tutorId: tutorId,
						assignmentId: assignmentId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!clientNotif.ok) {
					const notifError = await clientNotif.json();
					throw new Error(notifError.error || "Failed to send notification");
				}

				const tutorNotif = await fetch("/api/tutor/notifications/paidNotification", {
					method: "POST",
					body: JSON.stringify({
						clientId: clientId,
						tutorId: tutorId,
						assignmentId: assignmentId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!tutorNotif.ok) {
					const notifError = await tutorNotif.json();
					throw new Error(notifError.error || "Failed to send notification");
				}

				console.log("Notification sent successfully");
				router.push(`/client/${clientId}/assignment/${assignmentId}/view_assignment/payment_success?amount=${amount}&tutorId=${tutorId}`);
			}
		} catch (error: any) {
			setErrorMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	const testPay = async () => {
		const update = await fetch("/api/updatePayment", {
			method: "POST",
			body: JSON.stringify({
				assignmentId: assignmentId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!update.ok) {
			const updateError = await update.json();
			throw new Error(updateError.error || "Failed to update payment status");
		}

		console.log("Payment status updated, sending notification...");

		const clientNotif = await fetch("/api/client/notifications/createPaidNotification", {
			method: "POST",
			body: JSON.stringify({
				clientId: clientId,
				tutorId: tutorId,
				assignmentId: assignmentId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!clientNotif.ok) {
			const notifError = await clientNotif.json();
			throw new Error(notifError.error || "Failed to send notification");
		}

		const tutorNotif = await fetch("/api/tutor/notifications/paidNotification", {
			method: "POST",
			body: JSON.stringify({
				clientId: clientId,
				tutorId: tutorId,
				assignmentId: assignmentId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!tutorNotif.ok) {
			const notifError = await tutorNotif.json();
			throw new Error(notifError.error || "Failed to send notification");
		}

		console.log("Notification sent successfully");
		router.push(`/client/${clientId}/assignment/${assignmentId}/view_assignment/payment_success?amount=${amount}&tutorId=${tutorId}`);
	};

	const blueButton = {
		backgroundColor: "#5790AB",
		color: "#fff",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
		marginTop: "10px",
	};

	const whiteButton = {
		backgroundColor: "#fff",
		color: "#5790AB",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		border: "1px solid #5790AB",
		marginTop: "10px",
		width: "100%",
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
			{clientSecret && <PaymentElement />}
			{errorMessage && <div>{errorMessage}</div>}
			<Button disabled={!stripe || loading} style={blueButton}>
				{!loading ? "Pay" : "Processing..."}
			</Button>
			<Button style={whiteButton} onClick={testPay}>
				Test Pay
			</Button>
		</form>
	);
};

export default CheckoutPage;

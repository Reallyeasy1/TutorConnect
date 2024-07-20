"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";

const CheckoutPage = ({ amount, clientId, assignmentId }: { amount: number, clientId: string | string[], assignmentId: string | string[] }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState<string>();
	const [clientSecret, setClientSecret] = useState("");
	const [loading, setLoading] = useState(false);

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
			return;
		}

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setErrorMessage(submitError.message);
			setLoading(false);
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `http://localhost:3000//client/${clientId}/assignment/${assignmentId}/view_assignment/payment_success?amount=${amount}`,
			},
		});

		if (error) {
			// This point is only reached if there's an immediate error when
			// confirming the payment. Show the error to your customer (for example, payment details incomplete)
			setErrorMessage(error.message);
		}
		setLoading(false);
	};

	if (!clientSecret || !stripe || !elements) {
		return (
			<Loading />
		);
	}

	const blueButton = {
		backgroundColor: "#5790AB",
		color: "#fff",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
		marginTop: "10px",
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
			{clientSecret && <PaymentElement />}

			{errorMessage && <div>{errorMessage}</div>}

			<Button
				disabled={!stripe || loading}
				style={blueButton}
			>
				{!loading ? "Pay" : "Processing..."}
			</Button>
		</form>
	);
};

export default CheckoutPage;
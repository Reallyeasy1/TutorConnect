"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./checkout_page";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useParams } from "next/navigation";

export default function Payment() {
	const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const params = useParams();
  const clientId = params.clientId;
  const assignmentId = params.assignmentId;

	if (stripePublishableKey === undefined) {
		throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
	}

	const stripePromise = loadStripe(stripePublishableKey);
	const amount = 0.5;

	return (
		<div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
			<div className="mb-10">
				<h1 className="text-4xl font-extrabold mb-2">TutorConnect</h1>
				<h2 className="text-2xl">
					Matchmaking Fee:
					<span className="font-bold"> ${amount}</span>
				</h2>
			</div>
			<Elements
				stripe={stripePromise}
				options={{
					mode: "payment",
					amount: convertToSubcurrency(amount),
					currency: "sgd",
					payment_method_types: ["paynow", "card"],
				}}
			>
				<CheckoutPage amount={amount} clientId={clientId} assignmentId={assignmentId} />
			</Elements>
		</div>
	);
}

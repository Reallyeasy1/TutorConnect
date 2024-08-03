"use client";

import Footer from "@/components/footer/footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

export default function VerifyEmail() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const clientId = searchParams.get("clientId");
	const [submit, setSubmit] = useState(false);
	const onClickLogin = () => {
		router.push("/client/login");
	};

	const onClickResend = async () => {
		setSubmit(true);
		const response = await fetch("/api/client/getClientDetails", {
			method: "POST",
			body: JSON.stringify({
				clientId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (data?.email) {
			const email = data.email;
			const resendEmail = await fetch("/api/client/resendVerificationEmail", {
				method: "POST",
				body: JSON.stringify({
					email,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (resendEmail.ok) {
				alert("Email resent successfully. Please check your email.");
				setSubmit(false);
			} else {
				console.log("Failed to send email.");
				setSubmit(false);
			}
		} else {
			console.log("Cannot find user email.");
			setSubmit(false);
		}
	};

	const blueButton = {
		backgroundColor: "#5790AB",
		color: "#fff",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
	};

	const whiteButton = {
		backgroundColor: "#fff",
		color: "#5790AB",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
		border: "1px solid #5790AB",
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundColor: "#fff" }}>
			<div className="flex-grow flex justify-center items-center py-6">
				<Card className="w-[500px]">
					<CardHeader>
						<h1 className="font-bold text-2xl text-center">Verify your email</h1>
					</CardHeader>
					<CardContent>
						<p>We have sent a verification link to your email. Please click on the link to verify your email.</p>
					</CardContent>
					<CardFooter className="flex justify-between space-x-2">
						<Button style={whiteButton} className="flex-1" onClick={onClickResend} disabled={submit}>
							{submit ? <><Spinner /> Resending Email...</> : "Resend Verification Email"}
						</Button>
						<Button style={blueButton} className="flex-1" onClick={onClickLogin}>
							Login
						</Button>
					</CardFooter>
				</Card>
			</div>
			<Footer />
		</div>
	);
}

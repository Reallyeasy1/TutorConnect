"use client";

import Footer from "@/components/footer/footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmail() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const tutorId = searchParams.get("tutorId");
	const onClickLogin = () => {
		router.push("/tutor/login");
	};

	const onClickResend = async () => {
		const response = await fetch("/api/tutor/getTutorDetails", {
			method: "POST",
			body: JSON.stringify({
				tutorId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (data?.email) {
			const email = data.email;
			const resendEmail = await fetch("/api/tutor/resendVerificationEmail", {
				method: "POST",
				body: JSON.stringify({
					email,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (resendEmail.ok) {
				console.log("Email sent successfully.");
			} else {
				console.log("Failed to send email.");
			}
		} else {
			console.log("Cannot find user email.");
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
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<div className="flex-grow flex justify-center items-center py-6">
				<Card className="w-[500px]">
					<CardHeader>
						<h1 className="font-bold text-2xl text-center">Verify your email</h1>
					</CardHeader>
					<CardContent>
						<p>We have sent a verification link to your email. Please click on the link to verify your email.</p>
					</CardContent>
					<CardFooter className="flex justify-between space-x-2">
						<Button style={whiteButton} className="flex-1" onClick={onClickResend}>
							Resend Verification Email
						</Button>
						<Button className="flex-1" style={blueButton} onClick={onClickLogin}>
							Login
						</Button>
					</CardFooter>
				</Card>
			</div>
			<Footer />
		</div>
	);
}

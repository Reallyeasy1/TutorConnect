"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/alert";

export const ForgotPasswordForm = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [submit, setSubmit] = useState(false);
	const router = useRouter();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmit(true);

		try {
			const res = await fetch("/api/tutor/forgot-password", {
				method: "POST",
				body: JSON.stringify({
					email,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				router.push("/tutor/forgot_password/success");
			} else {
				setError((await res.json()).error);
				setSubmit(false);
			}
		} catch (error: any) {
			setError(error?.message);
			setSubmit(false);
		}

		console.log("Forgot Password!");
	};

	const blueButton = {
		backgroundColor: "#5790AB",
		color: "#fff",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
	};

	return (
		<form onSubmit={onSubmit}>
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Reset Password</CardTitle>
					<CardDescription>Enter your email address to reset your password.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="email">Email</Label>
							<Input required value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" />
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col items-center space-y-2">
					{error && <Alert>{error}</Alert>}
					<Button style={blueButton} disabled={submit}>
						{submit ? "Sending the email..." : "Reset Password"}
					</Button>
					<Link className="text-sm text-indigo-500 hover:underline center" href="/tutor/login">
						Back to Login
					</Link>
				</CardFooter>
			</Card>
		</form>
	);
};

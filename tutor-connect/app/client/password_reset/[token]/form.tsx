"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";

export const ResetPasswordForm = () => {
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const { token } = useParams();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			password.length < 8 ||
			!/[a-z]/.test(password) ||
			!/[A-Z]/.test(password) ||
			!/[0-9]/.test(password) ||
			!/[!@#$%^&*(),.?":{}|<>]/.test(password)
		) {
			setError(
				"Your password must be at least 8 characters long, contain at least one number and one special character, and have a mixture of uppercase and lowercase letters."
			);
			return;
		}

		if (password !== password2) {
			setError("Passwords do not match");
			return;
		}

		try {
			const res = await fetch("/api/client/reset-password", {
				method: "POST",
				body: JSON.stringify({
					token,
					password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				router.push("/client/login");
			} else {
				setError((await res.json()).error);
			}
		} catch (error: any) {
			setError(error?.message);
		}

		console.log("Reset Password!");
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
					<CardTitle>Set a new password</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password">Password</Label>
							<Input
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								id="password"
								type="password"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password2">Confirm Password</Label>
							<Input
								required
								value={password2}
								onChange={(e) => setPassword2(e.target.value)}
								id="password2"
								type="password"
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col items-center space-y-2">
					{error && <Alert>{error}</Alert>}
					<Button style={blueButton}>Reset Password</Button>
					<Link
						className="text-sm text-indigo-500 hover:underline center"
						href="/client/login"
					>
						Back to Login
					</Link>
				</CardFooter>
			</Card>
		</form>
	);
};

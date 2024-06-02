"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const Form = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/client/post_assignments"; // change
	//const error = searchParams.get('error') ? 'Invalid credentials' : ''
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await signIn("credentials", {
				redirect: false,
				email,
				password,
				callbackUrl,
			});
			if (!res?.error) {
				const response = await fetch("/api/client/getClientDetails", {
					method: "POST",
					body: JSON.stringify({
						email,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await response.json();
				if (data?.id) {
					router.push(
						"/client/client_assignment?clientId=" + data.id
					);
				} else {
					setError("Failed to retrieve user information");
				}
			} else {
				setError("Invalid email or password");
			}
		} catch (err: any) {}
	};
	return (
		<form onSubmit={onSubmit} className="space-y-4 w-full sm:w-[400px]">
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="email">Email</Label>
				<Input
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					id="email"
					type="email"
				/>
			</div>
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="password">Password</Label>
				<Input
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					id="password"
					type="password"
				/>
			</div>
			{error && <Alert>{error}</Alert>}
			<div className="w-full">
				<Button className="w-full" size="lg">
					Log in
				</Button>
			</div>
		</form>
	);
};

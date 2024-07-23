"use client";

import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/navBar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { B } from "@vercel/blob/dist/helpers-BfcvAwfQ.cjs";
import Link from "next/link";

export default function SuccessPage() {
	const blueButton = {
		backgroundColor: "#5790AB",
		color: "#fff",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<NavBar />
			<div className="flex-grow flex justify-center items-center py-6">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle className="text-center">
							Password Reset
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription className="text-center">
							An email has been sent to your email address with
							instructions to reset your password.
						</CardDescription>
					</CardContent>
					<CardFooter className="flex flex-col items-center space-y-2">
						<Button style={blueButton}>
							<Link href="/client/login">Back to Login</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
			<Footer />
		</div>
	);
}

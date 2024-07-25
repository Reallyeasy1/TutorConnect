"use client";

import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function InvalidSession() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error");

	useEffect(() => {
		signOut({ callbackUrl: "/client/login" });
	}, []);

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<div className="flex-grow flex justify-center items-center py-6">
				<Card className="w-[500px]">
					<CardHeader>
						<h1 className="font-bold text-2xl text-center">Invalid Session</h1>
					</CardHeader>
					<CardContent>
						<p>{error || "Your session has expired."} You will be automatically signed out. Please log in again.</p>
					</CardContent>
				</Card>
			</div>
			<Footer />
		</div>
	);
}

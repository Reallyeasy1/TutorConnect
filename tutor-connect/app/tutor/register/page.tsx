"use client";

import NavBar from "@/components/nav-bar/navBar";
import React from "react";
import { RegisterForm } from "./form";
import Logo from "@/components/nav-bar/logo";
import Footer from "@/components/footer/footer";
import Link from "next/link";

export default function RegisterPage() {
	const logoText = {
		color: "#5790AB",
		fontFamily: "Poppins",
		fontSize: 28,
		fontWeight: "bold",
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<NavBar />
			<div className="h-full w-screen flex justify-center items-center bg-navy-100 py-6">
				<div className="sm:shadow-xl px-8 pb-8 pt-8 sm:bg-white rounded-xl space-y-5">
					<div className="flex items-center justify-center">
						<Logo />
						<div style={logoText} className="ml-2">
							TutorConnect
						</div>
					</div>
					<h1 className="font-bold text-2xl text-center">
						Create your Account
					</h1>
					<RegisterForm />
					<p className="text-center">
						Have an account?{" "}
						<Link
							className="text-indigo-500 hover:underline"
							href="/tutor/login"
						>
							Sign in
						</Link>{" "}
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
}

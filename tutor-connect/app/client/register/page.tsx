"use client";

import NavBar from "@/components/nav-bar/navBar";
import React from "react";
import { RegisterForm } from "./form";
import Logo from "@/components/nav-bar/logo";
import Footer from "@/components/footer/footer";

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
			<div className="flex-grow flex justify-center items-center py-6">
				<div className="bg-white shadow-xl rounded-xl p-8 space-y-6 max-w-md w-full">
					<div className="flex flex-col items-center space-y-2">
						<div className="flex items-center">
							<Logo />
							<div style={logoText} className="ml-2">
								TutorConnect
							</div>
						</div>
						<RegisterForm />
						<p className="text-center">
							Have an account?{" "}
							<a
								className="text-indigo-500 hover:underline"
								href="/client/login"
							>
								Sign in
							</a>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

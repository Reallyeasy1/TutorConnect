"use client"

import Link from "next/link";
import { Form as LoginForm } from "./form";
import NavBar from "@/components/nav-bar/navBar";
import Logo from "@/components/nav-bar/logo";
import Footer from "@/components/footer/footer";

export default function LoginPage() {
    const logoText = {
		color: "#5790AB",
		fontFamily: "Poppins",
		fontSize: 28,
		fontWeight: "bold",
	}

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<NavBar />
			<div className="flex-grow flex justify-center items-center py-6">
				<div className="bg-white shadow-xl rounded-xl p-6 space-y-6 max-w-md w-full">
					<div className="flex flex-col items-center space-y-2">
						<div className="flex items-center">
							<Logo />
							<div style={logoText} className="ml-2">
								TutorConnect
							</div>
						</div>
						<LoginForm />
						<p className="text-center">
							Need to create an account?{" "}
							<Link
								className="text-indigo-500 hover:underline"
								href="/tutor/register"
							>
								Create Account
							</Link>{" "}
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

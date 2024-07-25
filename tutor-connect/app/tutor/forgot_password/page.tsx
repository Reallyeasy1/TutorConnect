"use client";

import NavBar from "@/components/nav-bar/navBar";
import { ForgotPasswordForm } from "./form";
import Footer from "@/components/footer/footer";

export default function ForgotPassword() {
	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<div className="flex-grow flex justify-center items-center py-6">
				<ForgotPasswordForm />
			</div>
			<Footer />
		</div>
	);
}

"use client"

import NavBar from "@/components/nav-bar/navBar";
import { ResetPasswordForm } from "./form";
import Footer from "@/components/footer/footer";

export default function ForgotPassword() {
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="flex items-center justify-center flex-grow">
				<ResetPasswordForm />
			</div>
			<Footer />
		</div>
	);
}

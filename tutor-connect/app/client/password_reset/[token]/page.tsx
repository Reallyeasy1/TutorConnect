"use client"

import { ResetPasswordForm } from "./form";
import Footer from "@/components/footer/footer";

export default function ForgotPassword() {
	return (
		<div className="flex flex-col min-h-screen" style={{ backgroundColor: "#fff" }}>
			<div className="flex items-center justify-center flex-grow">
				<ResetPasswordForm />
			</div>
			<Footer />
		</div>
	);
}

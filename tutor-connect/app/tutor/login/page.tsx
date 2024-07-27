"use client";

import Link from "next/link";
import { Form as LoginForm } from "./form";
import Logo from "@/components/nav-bar/logo";
import Footer from "@/components/footer/footer";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

	const logoText = {
		color: "#5790AB",
		fontFamily: "Poppins",
		fontSize: 28,
		fontWeight: "bold",
	};

	const errorText = {
		color: "red",
		fontSize: "16px",
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<div className="flex-grow flex justify-center items-center py-6">
				<div className="bg-white shadow-xl rounded-xl p-6 space-y-6 max-w-md w-full">
					<div className="flex flex-col items-center space-y-2">
						<div className="flex items-center">
							<Logo />
							<div style={logoText} className="ml-2">
								TutorConnect
							</div>
						</div>
						{error && <p style={errorText}>{error}</p>}
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
						<p className="text-center">
							<Link
								className="text-indigo-500 hover:underline"
								href="/tutor/forgot_password"
							>
								Forgot your password?
							</Link>{" "}
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

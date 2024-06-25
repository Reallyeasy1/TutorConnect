"use client";

import Link from "next/link";
import { PostAssignmentForm } from "./form";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/navBar";
import Logo from "@/components/nav-bar/logo";

export default function PostAssignmentPage() {
	const logoText = {
		color: "#5790AB",
		fontFamily: "Poppins",
		fontSize: 28,
		fontWeight: "bold",
	};

	return (
		<div>
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
						Post an Assignment here!
					</h1>
					<PostAssignmentForm />
				</div>
			</div>
			<Footer />
		</div>
	);
}
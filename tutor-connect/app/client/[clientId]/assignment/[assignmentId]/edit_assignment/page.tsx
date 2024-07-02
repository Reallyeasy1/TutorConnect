"use client";

import Link from "next/link";
import { UpdateAssignmentForm } from "./form";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/navBar";

export default function UpdateAssignmentPage() {
	return (
		<div>
			<NavBar />
			<div className="h-full w-screen flex justify-center items-center bg-navy-100 py-6">
				<div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
					<h1 className="font-semibold text-2xl">
						Update Assignment here
					</h1>
					<UpdateAssignmentForm />
				</div>
			</div>
			<Footer />
		</div>
	);
}

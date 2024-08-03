"use client";

import { UpdateAssignmentForm } from "./form";
import Footer from "@/components/footer/footer";

export default function UpdateAssignmentPage() {
	return (
		<div style={{ backgroundColor: "#fff" }}>
			<div className="h-full w-screen flex flex-col justify-center items-center bg-navy-100 py-6">
				<div style={{ padding: "20px", fontWeight: "bold", fontSize: "32px" }}>
					<h1>Update Assignment here</h1>
				</div>
				<div className="sm:shadow-xl px-8 pb-8 pt-8 sm:bg-white rounded-xl space-y-12">
					<UpdateAssignmentForm />
				</div>
			</div>
			<Footer />
		</div>
	);
}

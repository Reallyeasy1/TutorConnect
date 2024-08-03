"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";

interface Assignment {
	id: number;
	Subject: string;
	Level: string;
	Location: string;
	minRate: number;
	maxRate: number;
	description: string;
	postDate: string;
	taken: boolean;
	client: {
		id: number;
		name: string;
	};
}

export default function AllAssignments() {
	const [assignments, setAssignments] = useState<Assignment[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchAssignments() {
			try {
				const res = await fetch("/api/assignments");
				const contentType = res.headers.get("content-type");
				if (!res.ok) {
					const errorData = await res.json();
					setError(errorData.error || "Failed to fetch assignments");
					return;
				}

				if (contentType && contentType.includes("application/json")) {
					const data = await res.json();
					setAssignments(data);
				} else {
					setError("Unexpected content type: " + contentType);
				}
			} catch (err: any) {
				setError(err.message);
			}
		}

		fetchAssignments();
	}, []);

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

	return (
		<div style={{ backgroundColor: "#fff" }}>
			<div className="container mx-auto p-6 flex flex-col items-center">
				<h1 className="text-4xl font-bold mb-8 text-center">
					Available Assignments
				</h1>
				{assignments.length === 0 ? (
					<p className="text-gray-500 text-center">
						No assignments available.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-8">
						{assignments.map((assignment) => (
							<div
								key={assignment.id}
								className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full max-w-6xl"
							>
								<h2 className="text-2xl font-semibold mb-2">
									{assignment.Subject} - {assignment.Level}
								</h2>
								<p className="text-gray-700 mb-1">
									<strong>Location:</strong>{" "}
									{assignment.Location}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Rate:</strong> ${assignment.minRate}{" "}
									- ${assignment.maxRate}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Description:</strong>{" "}
									{assignment.description}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Post Date:</strong>{" "}
									{new Date(
										assignment.postDate
									).toLocaleDateString()}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Client:</strong>{" "}
									{assignment.client.name}
								</p>
								<p
									className={`text-gray-700 mb-1 ${
										assignment.taken
											? "text-red-500"
											: "text-green-500"
									}`}
								>
									<strong>Status:</strong>{" "}
									{assignment.taken ? "Taken" : "Available"}
								</p>
								{/* TODO: Add a new page for this
                             <button
                                className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                                onClick={() => window.location.href = `/assignments/view_assignment?assignmentId=${assignment.id}`}
                            >
                                View Assignment
                            </button> */}
							</div>
						))}
					</div>
				)}
			</div>
            <Footer />
		</div>
	);
}
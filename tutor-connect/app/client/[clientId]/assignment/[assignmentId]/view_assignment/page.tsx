"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams,useParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/navBar";

interface Assignment {
	id: number;
	subject: string;
	level: string;
	location: string;
	minRate: number;
	maxRate: number;
	description: string;
	postDate: string;
	taken: boolean;
	client: {
		id: number;
		name: string;
	};
	tutor: {
		id: number;
		name: string;
	};
}


//TODO: Change to update assignment details only and only accept possible clientId
export default function ViewAssignment() {
	const router = useRouter();
	const params = useParams();
	const assignmentId = params.assignmentId;
	const clientId = params.clientId;
	const [assignments, setAssignments] = useState<Assignment[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [error2, setError2] = useState<string | null>(null);

	async function accept_assignment(assignment: Assignment) {
		try {
				if (clientId != null) {
                        router.push(`/client/${clientId}/assignment/${assignmentId}/view_assignment/avail_tutors`);
                } else {
                    setError2("Client ID is required");
                }
			
		} catch (error: any) {
			setError(error?.message);
		}
	}

		async function tutorInfo(assignment: Assignment) {
		try {
				if (clientId != null) {
                        router.push(`/client/${clientId}/assignment/${assignmentId}/view_assignment/tutorInfo`);
                } else {
                    setError2("Client ID is required");
                }
			
		} catch (error: any) {
			setError(error?.message);
		}
	}

	async function edit_assignment(assignment: Assignment) {
		try {
				if (clientId != null) {
                        router.push(`/client/${clientId}/assignment/${assignmentId}/edit_assignment`);
                } else {
                    setError2("Client ID is required");
                }
			
		} catch (error: any) {
			setError(error?.message);
		}
	}

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
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="container mx-auto p-6 flex flex-col items-center flex-grow">
				<h1 className="text-4xl font-bold mb-8 text-center">
					Tutee Assignment
				</h1>
				{assignments.length === 0 ? (
					<p className="text-gray-500 text-center">
						No assignments available.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-8">
						{assignments
							.filter(
								(assignment) =>
									assignment.id.toString() === assignmentId
							)
							.map((assignment) => (
								<div
									key={assignment.id}
									className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full max-w-6xl"
								>
									<h2 className="text-2xl font-semibold mb-2">
										{assignment.subject} -{" "}
										{assignment.level}
									</h2>
									<p className="text-gray-700 mb-1">
										<strong>Location:</strong>{" "}
										{assignment.location}
									</p>
									<p className="text-gray-700 mb-1">
										<strong>Rate:</strong> $
										{assignment.minRate} - $
										{assignment.maxRate}
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
										{assignment.taken
											? "Taken"
											: "Available"}
									</p>
									<button
										className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full"
										onClick={() =>
											edit_assignment(assignment)
										}
									>
										Edit 
									</button>
									
									{ assignment.taken? 
									<button
										className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full"
										onClick={() =>
									tutorInfo(assignment)
										}
									>
										Tutor Info
									</button>
										:
									<button
										className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full"
										onClick={() =>
											accept_assignment(assignment)
										}
									>
										View Tutors 
									</button>
}
									{error2 && <Alert>{error2}</Alert>}
								</div>
							))}
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}

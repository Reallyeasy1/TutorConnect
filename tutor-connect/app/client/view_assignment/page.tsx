"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/navBar";

interface Assignment {
	id: number;
	subject: string;
	level: string;
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
	tutor: {
		id: number;
		name: string;
	};
}

//TODO: Change to update assignment details only and only accept possible clientId
export default function ViewAssignment() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const assignmentId = searchParams.get("assignmentId");
	const tutorId = searchParams.get("tutorId");
	const clientId = searchParams.get("clientId");
	const [assignments, setAssignments] = useState<Assignment[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [error2, setError2] = useState<string | null>(null);

	async function accept_assignment(assignment: Assignment) {
		try {
			console.log(tutorId);
			if (tutorId == null) {
				if (clientId != null) {
                        router.push(`/client/avail_tutors?clientId=${clientId}&assignmentId=${assignmentId}`);
                } else {
                    setError2("Tutor ID is required");
                }
			} else {
				const res = await fetch("/api/acceptAssignment", {
					method: "PUT",
					body: JSON.stringify({
						AssignmentId: assignment.id,
						Subject: assignment.subject,
						Level: assignment.level,
						clientId: assignment.client.id,
						client: assignment.client,
						tuteeLocation: assignment.Location,
						minRate: assignment.minRate,
						maxRate: assignment.maxRate,
						description: assignment.description,
						postDate: assignment.postDate,
						tutorId: tutorId, // Provide a value for the tutorId property
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (res.ok) {
					//TODO: Change to main page
					// router.push("/assignments"); // Use relative path
					alert("Successfully sent offer to client!");
					router.push(
						`/client/client_assignments?clientId=${clientId}`
					); // Use relative path
				} else {
					setError((await res.json()).error);
				}
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
										{assignment.Location}
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
											accept_assignment(assignment)
										}
									>
										View Details
									</button>
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

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/navBar";

interface Assignment {
	id: number;
	subject: string;
	level: string;
	address: string;
	postalCode: number;
	minRate: number;
	maxRate: number;
	duration: string;
	frequency: string;
	additionalDetails: string;
	typeOfTutor: string[];
	gender: string;
	race: string[];
	availability: string;
	postDate: string;
	taken: boolean;
	client: {
		id: number;
		name: string;
	};
}

export default function ViewAssignment() {
	const router = useRouter();
	const params = useParams();
	const assignmentId = params.assignmentId;
	const tutorId = params.tutorId;
	const [assignments, setAssignments] = useState<Assignment[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [error2, setError2] = useState<string | null>(null);

	async function clientInfo(assignment: Assignment) {
		try {
			console.log(tutorId);
			if (tutorId == null) {
				setError2("Tutor ID is required");
			} else {
				//TODO: Change to tutor/applyAssignment
                router.push(`/tutor/${tutorId}/chat?clientId=${assignment.client.id}&clientName=${assignment.client.name}`)
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
									{assignment.level} {assignment.subject}
								</h2>
								<p className="text-gray-700 mb-1">
									<strong>Address:</strong>{" "}
									{assignment.address} Singapore{" "}
									{assignment.postalCode}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Frequency:</strong>{" "}
									{assignment.duration},{" "}
									{assignment.frequency}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Rate:</strong> ${assignment.minRate}{" "}
									- ${assignment.maxRate}
								</p>
								{assignment.additionalDetails && (
									<p className="text-gray-700 mb-1">
										<strong>Additional Details:</strong>{" "}
										{assignment.additionalDetails}
									</p>
								)}
								<p className="text-gray-700 mb-1">
									<strong>Available on:</strong>{" "}
									{assignment.availability}
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
											clientInfo(assignment)
										}
									>
										Contact Client
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
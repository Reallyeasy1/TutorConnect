"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";
import Spinner from "@/components/spinner/spinner";

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

export default function AllAssignments() {
	const [assignments, setAssignments] = useState<Assignment[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();
	const params = useParams();
	const clientId = params.clientId;

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
			} finally {
				setLoading(false);
			}
		}

		fetchAssignments();
	}, []);

	if (loading) {
		return (
			<div className="text-center mt-10">
				<Spinner />;
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-red-500 text-center mt-10">
				Error: {error}{" "}
				<button
					className="ml-4 text-blue-500 underline"
					onClick={() => {
						setError(null);
						setLoading(true);
						// fetchAssignments();
					}}
				>
					Retry
				</button>
			</div>
		);
	}

	const assignment_filtered = assignments.filter(
		(assignment) => assignment.client.id.toString() === clientId
	);

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="container mx-auto p-6 flex flex-col items-center flex-grow">
				<h1 className="text-4xl font-bold mb-8 text-center">
					Available Assignments
				</h1>
				{assignment_filtered.length === 0 ? (
					<p className="text-gray-500 text-center">
						No assignments available.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-8">
						{assignment_filtered.map((assignment) => (
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
									{assignment.taken ? "Taken" : "Available"}
								</p>
								<button
									className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full"
									onClick={() => {
										router.push(
											`/client/${clientId}/assignment/${assignment.id}/view_assignment`
										);
									}}
								>
									View Assignment
								</button>
							</div>
						))}
					</div>
				)}
				<button
					className="mt-8 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
					onClick={() => {
						router.push(`/client/${clientId}/post_assignments`);
					}}
				>
					Post New Assignment Here!
				</button>
			</div>
			<Footer />
		</div>
	);
}
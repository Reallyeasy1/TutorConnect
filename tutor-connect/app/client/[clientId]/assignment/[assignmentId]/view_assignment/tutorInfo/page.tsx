"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import Footer from "@/components/footer/footer";
import { Button } from "@/components/ui/button";

interface Tutor {
	id: number;
	email: string;
	password: string;
	name: string;
	contactNumber: number;
	dateOfBirth: string;
	gender: string;
	age: number;
	nationality: string;
	race: string;
	typeOfTutor: string;
	yearsOfExperience: number;
	highestEducationLevel: string;
	location: string; // Added location field
}

export default function TutorInfo() {
	const router = useRouter();
	const params = useParams();
	const assignmentId = params.assignmentId;
	const clientId = params.clientId;
	const [tutor, setTutor] = useState<Tutor | null>(null); // Ensure tutors is initialized as an empty array
	const [error, setError] = useState<string | null>(null);
	const [error2, setError2] = useState<string | null>(null);

	async function contactTutor(tutor: Tutor) {
		try {
			if (!clientId) {
				setError2("Client ID is required");
				return;
			}
			//TODO: Fix chat
			router.push(`/client/${clientId}/chat?tutorId=${tutor.id}&tutorName=${tutor.name}`);
		} catch (error: any) {
			setError(error?.message);
		}
	}

	useEffect(() => {
		async function fetchTutors() {
			try {
				const res = await fetch(`/api/client/tutorInfo/${assignmentId}`);
				const contentType = res.headers.get("content-type");

				if (!res.ok) {
					const errorData = await res.json();
					setError(errorData.error || "Failed to fetch tutors");
					return;
				}

				if (contentType && contentType.includes("application/json")) {
					const data = await res.json();
					console.log("Fetched data:", data); // Debugging statement
					setTutor(data.tutor);
				} else {
					setError("Unexpected content type: " + contentType);
				}
			} catch (err: any) {
				setError(err.message);
			}
		}

		fetchTutors();
	}, [assignmentId]);

	useEffect(() => {
		console.log("Tutors state:", tutor); // Debugging statement
	}, [tutor]);

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

	const blueButton = {
		backgroundColor: "#5790AB",
		color: "#fff",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
		marginTop: "10px",
	};

	return (
		<div className="flex flex-col min-h-screen" style={{ backgroundColor: "#fff" }}>
			<div className="container mx-auto p-6 flex flex-col items-center flex-grow">
				<h1 className="text-4xl font-bold mb-8 text-center">Available Tutors</h1>
				{tutor == null ? (
					<p className="text-gray-500 text-center">No tutors available.</p>
				) : (
					<div className="grid grid-cols-1 gap-8">
						<div key={tutor.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full max-w-6xl">
							<div className="mt-4">
								<h3 className="text-xl font-semibold mb-2">Tutor Information</h3>
								<p className="text-gray-700 mb-1">
									<strong>Name:</strong> {tutor.name}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Contact Number:</strong> {tutor.contactNumber}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Date of Birth:</strong> {new Date(tutor.dateOfBirth).toLocaleDateString()}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Gender:</strong> {tutor.gender}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Age:</strong> {tutor.age}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Nationality:</strong> {tutor.nationality}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Race:</strong> {tutor.race}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Type of Tutor:</strong> {tutor.typeOfTutor}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Years of Experience:</strong> {tutor.yearsOfExperience}
								</p>
								<p className="text-gray-700 mb-1">
									<strong>Highest Education Level:</strong> {tutor.highestEducationLevel}
								</p>
							</div>
							<Button
								style={blueButton}
								onClick={() => contactTutor(tutor)}
							>
								Contact Tutor
							</Button>
							{error2 && <Alert>{error2}</Alert>}
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";
import * as React from "react";
import { OfferForm } from "./offer";
import Image from "next/image";
import Nothing from "@/components/ui/Nothing";

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

export default function AvailTutors() {
	const router = useRouter();
	const params = useParams();
	const assignmentId = params.assignmentId;
	const clientId = params.clientId;
	const [tutors, setTutors] = useState<Tutor[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [error2, setError2] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const tutorsResponse = await fetch(`/api/client/avail_tutors/${assignmentId}`);
				if (!tutorsResponse.ok) {
					throw new Error("Failed to fetch tutors");
				}
				const tutorsData = await tutorsResponse.json();
				setTutors(tutorsData.avail_tutors);
			} catch (err: any) {
				setError(err.message);
			}
		}
		fetchData();
	}, [assignmentId]);

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="container mx-auto p-6 flex flex-col items-center flex-grow">
				<h1 className="text-4xl font-bold mb-8 text-center">Available Tutors</h1>
				{tutors.length === 0 ? (
					<Nothing message={"No available tutors"} imageSrc={"/images/teacher.png"} imageAlt={"tutor"}/>
				) : (
					<div className="grid grid-cols-1 gap-8">
						{tutors.map((tutor) => (
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
								<OfferForm tutor={tutor} assignmentId={assignmentId} clientId={clientId} />
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

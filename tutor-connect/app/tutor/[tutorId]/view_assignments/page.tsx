import { redirect } from "next/navigation";
import Footer from "@/components/footer/footer";
import { Tutor } from "@prisma/client";
import { AllAssignments } from "./allAssignments";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

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
	coordinates: number[];
	tutorId: number | null;
	avail_tutors: Tutor[];
}

export default async function ViewAssignments() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.id) {
		redirect("/tutor/invalid_session");
	}

	const assignmentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutor/viewAssignments`, {
		method: "POST",
		body: JSON.stringify({
			tutorId: session.user.id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-cache",
	});

	if (!assignmentsRes.ok) {
		throw new Error("Failed to fetch assignments");
	}

	const assignmentsData = await assignmentsRes.json();

	const availableAssignments = assignmentsData.assignments.filter((assignment: Assignment) => assignment.taken === false && !assignment.tutorId);

	const markerPromises = assignmentsData.assignments.map((assignment: Assignment) => ({
		lat: assignment.coordinates[0],
		lng: assignment.coordinates[1],
		price: `$${assignment.minRate}`,
		assignment: assignment,
	}));

	const markerResults = await Promise.all(markerPromises);
	const validMarkers = markerResults.filter((result) => result !== null);
	console.log(assignmentsData)

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<AllAssignments assignments={availableAssignments} marker={validMarkers} filtered={availableAssignments} tutorId={session.user.id} />
			<Footer />
		</div>
	);
}

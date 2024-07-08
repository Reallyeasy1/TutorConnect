//TODO: Change the assignments format to the one from github
//TODO: Add filter function here

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

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
const AssignmentRow = ({ assignments }: { assignments: Assignment[] }) => {
	const router = useRouter();
	const params = useParams();
	const tutorId = params.tutorId;

	return (
		<div className="grid grid-cols-3 gap-4 p-6">
			{assignments.map((assignment) => (
				<div
					key={assignment.id}
					className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full max-w-6xl"
				>
					<h2 className="text-2xl font-semibold mb-2">
						{assignment.level} {assignment.subject}
					</h2>
					<p className="text-gray-700 mb-1">
						<strong>Address:</strong> {assignment.address} Singapore{" "}
						{assignment.postalCode}
					</p>
					<p className="text-gray-700 mb-1">
						<strong>Frequency:</strong> {assignment.duration},{" "}
						{assignment.frequency}
					</p>
					<p className="text-gray-700 mb-1">
						<strong>Rate:</strong> ${assignment.minRate} - $
						{assignment.maxRate}
					</p>
					{assignment.additionalDetails && (
						<p className="text-gray-700 mb-1">
							<strong>Additional Details:</strong>{" "}
							{assignment.additionalDetails}
						</p>
					)}
					<p className="text-gray-700 mb-1">
						<strong>Available on:</strong> {assignment.availability}
					</p>
					<p className="text-gray-700 mb-1">
						<strong>Post Date:</strong>{" "}
						{new Date(assignment.postDate).toLocaleDateString()}
					</p>
					<p className="text-gray-700 mb-1">
						<strong>Client:</strong> {assignment.client.name}
					</p>
					<p
						className={`text-gray-700 mb-1 ${
							assignment.taken ? "text-red-500" : "text-green-500"
						}`}
					>
						<strong>Status:</strong>{" "}
						{assignment.taken ? "Taken" : "Available"}
					</p>
					<button
                        className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                        onClick={() => (window.location.href = `/tutor/${tutorId}/accepted_assignments/${assignment.id}`)}
                    >
                        View Assignment
                    </button>
				</div>
			))}
		</div>
	);
};

export default function AppliedAssignments() {
	const [assignments, setAssignments] = useState<Assignment[]>([]);
	const [error, setError] = useState<string | null>(null);
	const params = useParams();
	const tutorId = params.tutorId;
    const [center, setCenter] = useState({ lat: 1.287953, lng: 103.851784 });
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [markers, setMarkers] = useState<
		{ lat: number; lng: number; price: string; assignment: Assignment }[]
	>([]);
    const [selectedAssignment, setSelectedAssignment] =
		useState<Assignment | null>(null);

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

	const groupedAssignments = [];
	for (let i = 0; i < assignments.length; i += 3) {
		groupedAssignments.push(assignments.slice(i, i + 3));
	}

    const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: process.env.MAPS_API_KEY!,
		libraries: ["places"],
	});

	const geocodeAddress = async (address: string) => {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
				address
			)}&key=${process.env.MAPS_API_KEY}`
		);
		const data = await response.json();
		if (data.status === "OK") {
			const { lat, lng } = data.results[0].geometry.location;
			return { lat, lng };
		} else {
			console.error(`Geocoding error: ${data.status}`);
			return null;
		}
	};

	const createMarkerIcon = (price: string): google.maps.Symbol => ({
		path: "M 0,0 h 25 a 5,5 0 0 1 5,5 v 18 a 5,5 0 0 1 -5,5 h -25 a 5,5 0 0 1 -5,-5 v -18 a 5,5 0 0 1 5,-5 z",
		fillColor: "white",
		fillOpacity: 1,
		strokeColor: "grey",
		strokeWeight: 2,
		scale: 1,
		labelOrigin: new google.maps.Point(12.5, 14),
	});

	const createMarkerLabel = (price: string): google.maps.MarkerLabel => ({
		text: price,
		color: "black",
		fontSize: "12px",
		fontWeight: "bold",
		fontFamily: "Poppins",
	});

    useEffect(() => {
		async function fetchAssignments() {
			try {
				const res = await fetch(
					`/api/tutor/${tutorId}/acceptedAssignments`
				);
				const contentType = res.headers.get("content-type");
				if (!res.ok) {
					const errorData = await res.json();
					setError(errorData.error || "Failed to fetch assignments");
					return;
				}

				if (contentType && contentType.includes("application/json")) {
					const data = await res.json();
					setAssignments(data.acceptedAssignments);

                    const markerPromises = data.acceptedAssignments.map(
						(assignment: Assignment) =>
							geocodeAddress(assignment.address).then(
								(coords) => ({
									...coords,
									price: `$${assignment.minRate}`,
									assignment: assignment,
								})
							)
					);
					const markerResults = await Promise.all(markerPromises);
					const validMarkers = markerResults.filter(
						(result) => result !== null
					);
					setMarkers(validMarkers);

				} else {
					setError("Unexpected content type: " + contentType);
				}
			} catch (err: any) {
				setError(err.message);
			}
		}

		fetchAssignments();
	}, [tutorId]);

    const handleMarkerClick = (
		assignment: Assignment,
		markerLat: number,
		markerLng: number
	) => {
		setSelectedAssignment(assignment);
		setCenter({ lat: markerLat, lng: markerLng });
	};

	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div
				className="flex-grow grid grid-cols-3 gap-8"
				style={{ height: "calc(100vh - 100px)" }}
			>
				<div className="col-span-2 p-6 overflow-auto">
                <h1 style={{ font: "Poppins", fontSize: "32px", fontWeight: "bold", textAlign: "center"}}>Accepted Assignments</h1>
					{groupedAssignments.length === 0 ? (
						<p className="text-gray-500 text-center">
							No assignments available.
						</p>
					) : (
						groupedAssignments.map((group, index) => (
							<AssignmentRow key={index} assignments={group} />
						))
					)}
				</div>
				<div className="col-span-1 h-full p-6">
                <div className="h-full bg-gray-300">
						{isLoaded && (
							<GoogleMap
								center={center}
								zoom={11}
								mapContainerStyle={{
									width: "100%",
									height: "100%",
								}}
								options={{
									zoomControl: false,
									streetViewControl: false,
									mapTypeControl: false,
									fullscreenControl: false,
								}}
								onLoad={(map) => setMap(map)}
							>
								{markers.map((marker, index) => (
									<Marker
										key={index}
										position={{
											lat: marker.lat,
											lng: marker.lng,
										}}
										icon={createMarkerIcon(marker.price)}
										label={createMarkerLabel(marker.price)}
										onClick={() =>
											handleMarkerClick(
												marker.assignment,
												marker.lat,
												marker.lng
											)
										}
									/>
								))}
							</GoogleMap>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

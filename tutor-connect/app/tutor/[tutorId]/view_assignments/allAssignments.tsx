"use client";

import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Loading from "@/app/loading";
import { Filter } from "./filter";
import Image from "next/image";
import { Tutor } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";;

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

type AllAssignmentsProps = {
	assignments: Assignment[];
	filtered: Assignment[];
    marker: { lat: number; lng: number; price: string; assignment: Assignment }[];
	tutorId: number;
};

const AssignmentRow = ({ assignments, selectedAssignment, tutorId }: { assignments: Assignment[]; selectedAssignment: Assignment | null, tutorId: number }) => {
    const router = useRouter();
	const blueButton = {
		backgroundColor: "#5790AB",
		color: "#fff",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
	};

	return (
		<div className="grid grid-cols-3 gap-2 p-4">
			{assignments.map((assignment) => (
				<div
					key={assignment.id}
					className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full max-w-6xl flex flex-col justify-between"
					style={{
						border: selectedAssignment == assignment ? "4px solid #5790AB" : "1px solid #ddd",
					}}
				>
					<div>
						<h2 className="text-2xl font-semibold mb-2">
							{assignment.level.includes("Poly") || assignment.level.includes("University")
								? assignment.level.substring(assignment.level.indexOf(" ") + 1)
								: assignment.level}{" "}
							{assignment.subject}
						</h2>
						<p className="text-gray-700 mb-1">
							<strong>Tutor Type:</strong> {(assignment.gender === "Male" || assignment.gender === "Female") && assignment.gender}{" "}
							{assignment.typeOfTutor.join(", ")}
						</p>
						<p className="text-gray-700 mb-1">
							<strong>Address:</strong> {assignment.address} Singapore {assignment.postalCode}
						</p>
						<p className="text-gray-700 mb-1">
							<strong>Frequency:</strong> {assignment.duration}, {assignment.frequency}
						</p>
						<p className="text-gray-700 mb-1">
							<strong>Hourly Rate:</strong> ${assignment.minRate} - ${assignment.maxRate}
						</p>
						{assignment.additionalDetails && (
							<p className="text-gray-700 mb-1">
								<strong>Additional Details:</strong> {assignment.additionalDetails}
							</p>
						)}
						<p className="text-gray-700 mb-1">
							<strong>Available on:</strong> {assignment.availability}
						</p>
						<p className="text-gray-700 mb-1">
							<strong>Post Date:</strong> {new Date(assignment.postDate).toLocaleDateString()}
						</p>
						<p className={`text-gray-700 mb-1 ${assignment.taken ? "text-red-500" : "text-green-500"}`}>
							<strong>Status:</strong> {assignment.taken ? "Taken" : "Available"}
						</p>
					</div>
					<div className="mt-4">
						<Button style={blueButton} onClick={() => router.push(`/tutor/${tutorId}/view_assignment/${assignment.id}`)}>
							View Assignment
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};

export const AllAssignments: React.FC<AllAssignmentsProps> = ({ assignments, filtered, marker, tutorId }) => {
	const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>(filtered);
	const [error, setError] = useState<string | null>(null);
	const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 1.287953, lng: 103.851784 });
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [zoom, setZoom] = useState(11);
	const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const markers = marker;

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: process.env.MAPS_API_KEY!,
		libraries: ["places"],
	});

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

	const handleMarkerClick = (assignment: Assignment, markerLat: number, markerLng: number) => {
		setSelectedAssignment(assignment);
		const latLng = new google.maps.LatLng(markerLat, markerLng);
		const latitude = latLng.lat();
		const longitude = latLng.lng();
		setCenter({ lat: latitude, lng: longitude });
		setZoom(15);
	};
	const filteredMarkers = markers.filter((marker) => filteredAssignments.some((assignment) => assignment.id === marker.assignment.id));

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

	if (loadError) {
		return <div className="text-red-500">Error loading map</div>;
	}

    if (!isLoaded) {
        return <Loading />;
    }

	const assignmentFiltered = filteredAssignments.filter((assignment) => !assignment.taken);

	const groupedAssignments = [];
	for (let i = 0; i < assignmentFiltered.length; i += 3) {
		groupedAssignments.push(assignmentFiltered.slice(i, i + 3));
	}

	const styles = {
		emptySection: {
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "20px",
			width: "100%",
		},
		nothing: {
			fontSize: "24px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#909090",
			padding: "20px",
		},
	};

	return (
		<>
			<div className="flex-grow flex flex-col justify-center items-center py-6">
				<Filter assignments={assignments} setFilteredAssignments={setFilteredAssignments} tutorId={tutorId} />
			</div>
			<div className="flex-grow grid grid-cols-3 gap-8" style={{ height: "calc(100vh - 100px)" }}>
				<div className="col-span-2 p-3 overflow-auto">
					{groupedAssignments.length === 0 ? (
						<div style={styles.emptySection}>
							<Image
								src="/images/Offer.png"
								alt="Offer"
								width={150}
								height={150}
								quality={100}
								style={{
									width: "150px",
									height: "150px",
								}}
							/>
							<p style={styles.nothing}>No assignments available.</p>
						</div>
					) : (
						groupedAssignments.map((group, index) => (
							<AssignmentRow key={index} assignments={group} selectedAssignment={selectedAssignment} tutorId={tutorId} />
						))
					)}
				</div>
				<div className="col-span-1 h-full p-6">
					<div className="h-full bg-gray-300">
						{isLoaded && (
							<GoogleMap
								center={center}
								zoom={zoom}
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
								{filteredMarkers.map((marker, index) => (
									<Marker
										key={index}
										position={new google.maps.LatLng(marker.lat, marker.lng)}
										icon={createMarkerIcon(marker.price)}
										label={createMarkerLabel(marker.price)}
										onClick={() => handleMarkerClick(marker.assignment, marker.lat, marker.lng)}
									/>
								))}
							</GoogleMap>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

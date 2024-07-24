"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from "@/components/ui/multiselect";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { levels, subjectsByLevel } from "@/utils/levelsAndSubjects";
import { locations } from "@/utils/locations";
import Link from "next/link";

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
}

type FilterProps = {
	assignments: Assignment[];
	setFilteredAssignments: (filteredAssignments: Assignment[]) => void;
	tutorId: string | string[];
};

export const Filter: React.FC<FilterProps> = ({ assignments, setFilteredAssignments, tutorId }) => {
	const [gender, setGender] = useState("");
	const [race, setRace] = useState("");
	const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
	const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
	const [tutorType, setTutorType] = useState("");
	const [location, setLocation] = useState<string[]>([]);

	const clearFilters = () => {
		setGender("");
		setRace("");
		setSelectedLevel(null);
		setSelectedSubject([]);
		setTutorType("");
		setLocation([]);
		setFilteredAssignments(assignments);
	};

	function determineRegion(latitude: number, longitude: number): string {
		if (latitude > 1.38 && longitude > 103.85) {
			return "North East";
		} else if (latitude > 1.38 && longitude < 103.85) {
			return "North West";
		} else if (latitude > 1.35) {
			return "North";
		} else if (latitude < 1.25) {
			return "South";
		} else if (longitude > 103.85) {
			return "East";
		} else if (longitude < 103.85) {
			return "West";
		} else {
			return "Central";
		}
	}

	const search = () => {
		let filtered = assignments.filter(
			(assignment: Assignment) =>
				(!gender || assignment.gender === gender || assignment.gender === "No Preference") &&
				(!race || assignment.race.includes(race)) &&
				(!selectedLevel || assignment.level.includes(selectedLevel)) &&
				(!selectedSubject.length || selectedSubject.includes(assignment.subject)) &&
				(!tutorType || assignment.typeOfTutor.includes(tutorType)) &&
				(!location.length || location.includes(determineRegion(assignment.coordinates[0], assignment.coordinates[1])))
		);
		setFilteredAssignments(filtered);
	};

	const styles = {
		sectionTitle: {
			fontWeight: "bold",
			fontSize: "24px",
			font: "Poppins",
			color: "#fff",
			textAlign: "center" as "center",
			padding: "10px 0",
			backgroundColor: "#5790AB",
			borderRadius: "10px",
			width: "300px",
			display: "flex",
			justifyContent: "center",
		},
		filterSection: {
			border: "1px solid lightgray",
			borderRadius: "10px",
			padding: "20px",
			marginBottom: "20px",
			width: "700px",
		},
		button: {
			backgroundColor: "#5790AB",
			color: "#fff",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "100%",
		},
		filterButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "100%",
			border: "1px solid #5790AB",
		},
		link: {
			color: "#0d6efd",
			font: "Poppins",
			fontSize: "16px",
			textAlign: "center" as "center",
		},
	};
	return (
		<div style={styles.filterSection}>
			<div className="grid grid-cols-2 gap-4" style={{ padding: "7px" }}>
				<div
					className="col-span-2 space-y-1"
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<h1 style={styles.sectionTitle}>Filter Assignments</h1>
				</div>
				<div className="col-span-1 space-y-1">
					<Label htmlFor="gender" style={{ fontWeight: "bold" }}>
						Gender
					</Label>
					<Select required value={gender} onValueChange={(value: string) => setGender(value)}>
						<div>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a gender" />
							</SelectTrigger>
						</div>
						<SelectContent>
							<SelectItem value="Male">Male</SelectItem>
							<SelectItem value="Female">Female</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="col-span-1 space-y-1">
					<Label htmlFor="race" style={{ fontWeight: "bold" }}>
						Race
					</Label>
					<Select required value={race} onValueChange={(value: string) => setRace(value)}>
						<div>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a race" />
							</SelectTrigger>
						</div>
						<SelectContent>
							<SelectItem value="Chinese">Chinese</SelectItem>
							<SelectItem value="Malay">Malay</SelectItem>
							<SelectItem value="Indian">Indian</SelectItem>
							<SelectItem value="Others">Others</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4" style={{ padding: "7px" }}>
				<div className="col-span-1 space-y-1">
					<Label htmlFor="level">Level</Label>
					<Select value={selectedLevel || ""} onValueChange={(value: string) => setSelectedLevel(value)}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a Level" />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(levels).map(([category, levels]) => (
								<SelectGroup key={category}>
									<SelectLabel>{category}</SelectLabel>
									{levels.map((level: string) => (
										<SelectItem key={level} value={level}>
											{level}
										</SelectItem>
									))}
								</SelectGroup>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="col-span-1 space-y-1">
					<Label htmlFor="subject" style={{ fontWeight: "bold" }}>
						Subject
					</Label>
					<MultiSelector
						values={selectedSubject}
						onValuesChange={setSelectedSubject}
						loop={false}
						disabled={!selectedLevel || selectedLevel === "Poly" || selectedLevel === "University"}
						className="space-y-0"
					>
						<MultiSelectorTrigger className="w-full">
							<MultiSelectorInput placeholder={"Select a Subject"} style={{ fontSize: "15px" }} />
						</MultiSelectorTrigger>
						<MultiSelectorContent>
							<MultiSelectorList>
								{selectedLevel &&
									subjectsByLevel[selectedLevel].map((subject: string) => (
										<MultiSelectorItem key={subject} value={subject}>
											{subject}
										</MultiSelectorItem>
									))}
							</MultiSelectorList>
						</MultiSelectorContent>
					</MultiSelector>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4" style={{ padding: "7px" }}>
				<div className="col-span-1 space-y-1">
					<Label htmlFor="typeOfTutor" style={{ fontWeight: "bold" }}>
						Type of Tutor
					</Label>
					<Select required value={tutorType} onValueChange={(value: string) => setTutorType(value)}>
						<div>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a type" />
							</SelectTrigger>
						</div>
						<SelectContent>
							<SelectItem value="Part-Time Tutor">Part-Time Tutor</SelectItem>
							<SelectItem value="Full-Time Tutor">Full-Time Tutor</SelectItem>
							<SelectItem value="Ex/Current MOE Teacher">Ex/Current MOE Teacher</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="col-span-1 space-y-1">
					<Label htmlFor="location" style={{ fontWeight: "bold" }}>
						Location
					</Label>
					<MultiSelector values={location} onValuesChange={setLocation} loop={false} className="space-y-0">
						<MultiSelectorTrigger className="w-full">
							<MultiSelectorInput placeholder={"Select a Location"} style={{ fontSize: "15px" }} />
						</MultiSelectorTrigger>
						<MultiSelectorContent>
							<MultiSelectorList>
								{locations.map((loc) => (
									<MultiSelectorItem key={loc[0]} value={loc[0]}>
										{loc[0]}
									</MultiSelectorItem>
								))}
							</MultiSelectorList>
						</MultiSelectorContent>
					</MultiSelector>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4" style={{ padding: "7px" }}>
				<div className="col-span-1 space-y-1">
					<Button style={styles.button} onClick={search}>
						Search
					</Button>
				</div>
				<div className="col-span-1 space-y-1">
					<Button style={styles.filterButton} onClick={clearFilters}>
						Clear Filters
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4" style={{ padding: "7px" }}>
				<div className="col-span-2 space-y-1">
					<Link className="hover:underline" style={styles.link} href={`/tutor/${tutorId}/my_assignments`}>
						Go to My Assignments
					</Link>
				</div>
			</div>
		</div>
	);
};

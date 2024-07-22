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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { subjectsByCategory } from "@/utils/levelsAndSubjects";

type Tutor = {
	id: number;
	name: string;
	gender: string;
	race: string;
	typeOfTutor: string;
	yearsOfExperience: number;
	highestEducationLevel: string;
	image: string;
	introduction: string;
	levelAndSubjects: CheckedSubjects;
};

type CheckedSubjects = {
	"Pre-School": string[];
	"Primary School": string[];
	"Secondary School": string[];
	"Junior College": string[];
	"IB/IGCSE": string[];
	"Diploma/Degree": string[];
};

type FilterProps = {
	tutors: Tutor[];
	setFilteredTutors: (filteredTutors: Tutor[]) => void;
};

export const Filter: React.FC<FilterProps> = ({ tutors, setFilteredTutors }) => {
	const [gender, setGender] = useState("");
	const [race, setRace] = useState("");
	const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
	const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
	const [tutorType, setTutorType] = useState("");
	const [yearsOfExperience, setYearsOfExperience] = useState("");
	const [nameSearch, setNameSearch] = useState("");

	const clearFilters = () => {
		setGender("");
		setRace("");
		setSelectedLevel(null);
		setSelectedSubject([]);
		setTutorType("");
		setYearsOfExperience("");
		setFilteredTutors(tutors);
		setNameSearch("");
	};

	const search = () => {
		let filtered = tutors.filter(
			(tutor: Tutor) =>
				tutor.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
				(!gender || tutor.gender === gender) &&
				(!race || tutor.race === race) &&
				(!selectedLevel || tutor.levelAndSubjects[selectedLevel as keyof CheckedSubjects].length > 0) &&
				(!selectedSubject.length ||
					selectedSubject.every((subject) => tutor.levelAndSubjects[selectedLevel as keyof CheckedSubjects].includes(subject))) &&
				(!tutorType || tutor.typeOfTutor === tutorType) &&
				(!yearsOfExperience || tutor.yearsOfExperience >= parseInt(yearsOfExperience))
		);
		setFilteredTutors(filtered);
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
					<h1 style={styles.sectionTitle}>Tutor Search</h1>
				</div>
				<div className="col-span-2 space-y-1">
					<Label htmlFor="search" style={{ fontWeight: "bold" }}>
						Search
					</Label>
					<Input placeholder="Search by name" value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} />
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
					<Label htmlFor="level" style={{ fontWeight: "bold" }}>
						Level
					</Label>
					<Select
						value={selectedLevel || ""}
						onValueChange={(value: string) => {
							setSelectedLevel(value);
						}}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a Level" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{Object.entries(subjectsByCategory).map((category) => (
									<SelectItem key={category[0]} value={category[0]}>
										{category[0]}
									</SelectItem>
								))}
							</SelectGroup>
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
						disabled={!selectedLevel}
						className="space-y-0"
					>
						<MultiSelectorTrigger className="w-full">
							<MultiSelectorInput placeholder={"Select a Subject"} style={{ fontSize: "15px" }} />
						</MultiSelectorTrigger>
						<MultiSelectorContent>
							<MultiSelectorList>
								{selectedLevel &&
									subjectsByCategory[selectedLevel].map((subject: string) => (
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
					<Label htmlFor="yearsOfExperience" style={{ fontWeight: "bold" }}>
						Years of Experience
					</Label>
					<Input
						required
						value={yearsOfExperience}
						onChange={(e) => setYearsOfExperience(e.target.value)}
						id="yearsOfExperience"
						type="yearsOfExperience"
						placeholder="Please input a number"
					/>
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
		</div>
	);
};

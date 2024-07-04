/**
 * The RegisterForm component in TypeScript React handles form submission for posting assignments with
 * input fields for subject, level, location, rates, and description.
 * @returns The `RegisterForm` component is being returned. It is a form component that allows users to
 * input information such as subject, level, location, rates, and description for posting an
 * assignment. The form includes input fields for Subject, Level, Location, Min Rate, Max Rate, and
 * Description. It also displays an error message if there is an error during form submission. Finally,
 * there is a "
 */
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const PostAssignmentForm = () => {
	const router = useRouter();
	const params = useParams();
	const clientId = params.clientId;
	const [additionalDetails, setAdditionalDetails] = useState("");
	const [address, setAddress] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [minRate, setMinRate] = useState<number>(0);
	const [maxRate, setMaxRate] = useState<number>(0);
	const [duration, setDuration] = useState("");
	const [frequency, setFrequency] = useState("");
	const [currentTab, setCurrentTab] = useState("lessonDetails");
	const [typeOfTutor, setTypeOfTutor] = useState<string[]>([]);
	const [gender, setGender] = useState("");
	const [race, setRace] = useState<string[]>([]);
	const [availability, setAvailability] = useState("");
	const [error, setError] = useState<string | null>(null);

	const levels: { [key: string]: string[] } = {
		Primary: [
			"Primary 1",
			"Primary 2",
			"Primary 3",
			"Primary 4",
			"Primary 5",
			"Primary 6",
		],
		"Lower Secondary": [
			"Sec 1 Express",
			"Sec 1 NA",
			"Sec 1 NT",
			"Sec 1 IP",
			"Sec 2 Express",
			"Sec 2 NA",
			"Sec 2 NT",
			"Sec 2 IP",
		],
		"Upper Secondary": [
			"Sec 3 Express",
			"Sec 3 NA",
			"Sec 3 NT",
			"Sec 3 IP",
			"Sec 4 Express",
			"Sec 4 NA",
			"Sec 4 NT",
			"Sec 4 IP",
			"Sec 5 NA",
			"Sec 5 NT",
		],
		"Junior College": ["JC1", "JC2"],
		"Pre-School": [
			"Nursery 1",
			"Nursery 2",
			"Kindergarten 1",
			"Kindergarten 2",
		],
		IGCSE: [
			"IGCSE Year 1",
			"IGCSE Year 2",
			"IGCSE Year 3",
			"IGCSE Year 4",
			"IGCSE Year 5",
			"IGCSE Year 6",
			"IGCSE Year 7",
			"IGCSE Year 8",
			"IGCSE Year 9",
			"IGCSE Year 10",
		],
		"IB/Diploma": ["IB Year 1", "IB Year 2"],
		"Poly/University": ["Poly", "University"],
		Others: ["Others"],
	};
	type Category = keyof typeof levels;
	type Level = (typeof levels)[Category][number];
	const [level, setLevel] = useState<Level | "">("");
	const [otherLevel, setOtherLevel] = useState("");
	const [subject, setSubject] = useState("");
	const [otherSubject, setOtherSubject] = useState("");

	const subjectsByLevel: Record<Level, string[]> = {
		"Primary 1": [
			"English",
			"Math",
			"Science",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higher Tamil",
			"Hindi",
		],
		"Primary 2": [
			"English",
			"Math",
			"Science",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higher Tamil",
			"Hindi",
		],
		"Primary 3": [
			"English",
			"Math",
			"Science",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higher Tamil",
			"Hindi",
		],
		"Primary 4": [
			"English",
			"Math",
			"Science",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higher Tamil",
			"Hindi",
		],
		"Primary 5": [
			"English",
			"Math",
			"Science",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higher Tamil",
			"Hindi",
		],
		"Primary 6": [
			"English",
			"Math",
			"Science",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higher Tamil",
			"Hindi",
		],
		"Sec 1 Express": [
			"English",
			"Math",
			"Science",
			"Physics",
			"Chemistry",
			"Biology",
			"Geography",
			"History",
			"Literature",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
		],
		"Sec 1 NA": [
			"English",
			"Math",
			"Science",
			"Physics",
			"Chemistry",
			"Biology",
			"Geography",
			"History",
			"Literature",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
		],
		"Sec 1 NT": [
			"English",
			"Math",
			"Science",
			"Physics",
			"Chemistry",
			"Biology",
			"Geography",
			"History",
			"Literature",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
		],
		"Sec 1 IP": [
			"English",
			"Math",
			"Science",
			"Physics",
			"Chemistry",
			"Biology",
			"Geography",
			"History",
			"Literature",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
		],
		"Sec 2 Express": [
			"English",
			"Math",
			"Science",
			"Physics",
			"Chemistry",
			"Biology",
			"Geography",
			"History",
			"Literature",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
		],
		"Sec 2 NA": [
			"English",
			"Math",
			"Science",
			"Physics",
			"Chemistry",
			"Biology",
			"Geography",
			"History",
			"Literature",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
		],
		"Sec 2 NT": [
			"English",
			"Math",
			"Science",
			"Physics",
			"Chemistry",
			"Biology",
			"Geography",
			"History",
			"Literature",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
		],
		"Sec 2 IP": [
			"English",
			"Math",
			"Science",
			"Physics",
			"Chemistry",
			"Biology",
			"Geography",
			"History",
			"Literature",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
		],
		"Sec 3 Express": [
			"English",
			" A Math",
			"E Math",
			"Physics",
			"Chemistry",
			"Biology",
			"Combined Science (Physics only)",
			"Combined Science (Chemistry only)",
			"Combined Science (Biology only)",
			"Combined Science (Physics/Chemistry)",
			"Combined Science (Biology/Chemistry)",
			"Combined Science (Biology/Physics)",
			"Geography",
			"History",
			"Literature",
			"Principle of Accounting (POA)",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
			"Music",
			"Art",
		],
		"Sec 3 NA": [
			"English",
			" A Math",
			"E Math",
			"Physics",
			"Chemistry",
			"Biology",
			"Combined Science (Physics only)",
			"Combined Science (Chemistry only)",
			"Combined Science (Biology only)",
			"Combined Science (Physics/Chemistry)",
			"Combined Science (Biology/Chemistry)",
			"Combined Science (Biology/Physics)",
			"Geography",
			"History",
			"Literature",
			"Principle of Accounting (POA)",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
			"Music",
			"Art",
		],
		"Sec 3 NT": [
			"English",
			" A Math",
			"E Math",
			"Physics",
			"Chemistry",
			"Biology",
			"Combined Science (Physics only)",
			"Combined Science (Chemistry only)",
			"Combined Science (Biology only)",
			"Combined Science (Physics/Chemistry)",
			"Combined Science (Biology/Chemistry)",
			"Combined Science (Biology/Physics)",
			"Geography",
			"History",
			"Literature",
			"Principle of Accounting (POA)",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
			"Music",
			"Art",
		],
		"Sec 3 IP": [
			"English",
			" A Math",
			"E Math",
			"Physics",
			"Chemistry",
			"Biology",
			"Combined Science (Physics only)",
			"Combined Science (Chemistry only)",
			"Combined Science (Biology only)",
			"Combined Science (Physics/Chemistry)",
			"Combined Science (Biology/Chemistry)",
			"Combined Science (Biology/Physics)",
			"Geography",
			"History",
			"Literature",
			"Principle of Accounting (POA)",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
			"Music",
			"Art",
		],
		"Sec 4 Express": [
			"English",
			" A Math",
			"E Math",
			"Physics",
			"Chemistry",
			"Biology",
			"Combined Science (Physics only)",
			"Combined Science (Chemistry only)",
			"Combined Science (Biology only)",
			"Combined Science (Physics/Chemistry)",
			"Combined Science (Biology/Chemistry)",
			"Combined Science (Biology/Physics)",
			"Geography",
			"History",
			"Literature",
			"Principle of Accounting (POA)",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
			"Music",
			"Art",
		],
		"Sec 4 NA": [
			"English",
			" A Math",
			"E Math",
			"Physics",
			"Chemistry",
			"Biology",
			"Combined Science (Physics only)",
			"Combined Science (Chemistry only)",
			"Combined Science (Biology only)",
			"Combined Science (Physics/Chemistry)",
			"Combined Science (Biology/Chemistry)",
			"Combined Science (Biology/Physics)",
			"Geography",
			"History",
			"Literature",
			"Principle of Accounting (POA)",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
			"Music",
			"Art",
		],
		"Sec 4 NT": [
			"English",
			" A Math",
			"E Math",
			"Physics",
			"Chemistry",
			"Biology",
			"Combined Science (Physics only)",
			"Combined Science (Chemistry only)",
			"Combined Science (Biology only)",
			"Combined Science (Physics/Chemistry)",
			"Combined Science (Biology/Chemistry)",
			"Combined Science (Biology/Physics)",
			"Geography",
			"History",
			"Literature",
			"Principle of Accounting (POA)",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
			"Music",
			"Art",
		],
		"Sec 4 IP": [
			"English",
			" A Math",
			"E Math",
			"Physics",
			"Chemistry",
			"Biology",
			"Combined Science (Physics only)",
			"Combined Science (Chemistry only)",
			"Combined Science (Biology only)",
			"Combined Science (Physics/Chemistry)",
			"Combined Science (Biology/Chemistry)",
			"Combined Science (Biology/Physics)",
			"Geography",
			"History",
			"Literature",
			"Principle of Accounting (POA)",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
			"Music",
			"Art",
		],
		"Sec 5 NA": [
			"English",
			" A Math",
			"E Math",
			"Physics",
			"Chemistry",
			"Biology",
			"Combined Science (Physics only)",
			"Combined Science (Chemistry only)",
			"Combined Science (Biology only)",
			"Combined Science (Physics/Chemistry)",
			"Combined Science (Biology/Chemistry)",
			"Combined Science (Biology/Physics)",
			"Geography",
			"History",
			"Literature",
			"Principle of Accounting (POA)",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
			"Music",
			"Art",
		],
		"Sec 5 NT": [
			"English",
			" A Math",
			"E Math",
			"Physics",
			"Chemistry",
			"Biology",
			"Combined Science (Physics only)",
			"Combined Science (Chemistry only)",
			"Combined Science (Biology only)",
			"Combined Science (Physics/Chemistry)",
			"Combined Science (Biology/Chemistry)",
			"Combined Science (Biology/Physics)",
			"Geography",
			"History",
			"Literature",
			"Principle of Accounting (POA)",
			"Social Studies",
			"Chinese",
			"Higher Chinese",
			"Malay",
			"Higher Malay",
			"Tamil",
			"Higer Tamil",
			"Hindi",
			"Music",
			"Art",
		],
		JC1: [
			"H1 General Paper",
			"H1 Math",
			"H2 Math",
			"H2 Further Math",
			"H1 Biology",
			"H2 Biology",
			"H1 Chemistry",
			"H2 Chemistry",
			"H1 Physics",
			"H2 Physics",
			"H1 Computing",
			"H2 Computing",
			"H1 Economics",
			"H2 Economics",
			"H1 History",
			"H2 History",
			"H1 Geography",
			"H2 Geography",
			"H1 Literature",
			"H2 Literature",
			"H2 Chinese Language and Literature",
			"H3 Math",
			"H3 Biology",
			"H3 Chemistry",
			"H3 Physics",
			"H3 Economics",
			"H3 History",
			"H3 Geography",
			"H3 Literature",
			"H2 Knowledge & Inquiry",
			"H1 Chinese",
			"H1 Malay",
			"H1 Tamil",
		],
		JC2: [
			"H1 General Paper",
			"H1 Math",
			"H2 Math",
			"H2 Further Math",
			"H1 Biology",
			"H2 Biology",
			"H1 Chemistry",
			"H2 Chemistry",
			"H1 Physics",
			"H2 Physics",
			"H1 Computing",
			"H2 Computing",
			"H1 Economics",
			"H2 Economics",
			"H1 History",
			"H2 History",
			"H1 Geography",
			"H2 Geography",
			"H1 Literature",
			"H2 Literature",
			"H2 Chinese Language and Literature",
			"H3 Math",
			"H3 Biology",
			"H3 Chemistry",
			"H3 Physics",
			"H3 Economics",
			"H3 History",
			"H3 Geography",
			"H3 Literature",
			"H2 Knowledge & Inquiry",
			"H1 Chinese",
			"H1 Malay",
			"H1 Tamil",
		],
		"Nursery 1": [
			"English",
			" Math",
			"Chinese",
			"Malay",
			"Tamil",
			"Phonics",
			"Creative Writing",
		],
		"Nursery 2": [
			"English",
			" Math",
			"Chinese",
			"Malay",
			"Tamil",
			"Phonics",
			"Creative Writing",
		],
		"Kindergarten 1": [
			"English",
			" Math",
			"Chinese",
			"Malay",
			"Tamil",
			"Phonics",
			"Creative Writing",
		],
		"Kindergarten 2": [
			"English",
			" Math",
			"Chinese",
			"Malay",
			"Tamil",
			"Phonics",
			"Creative Writing",
		],
		"IGCSE Year 1": ["Math", "English", "Science", "History"],
		"IGCSE Year 2": ["Math", "English", "Science", "History"],
		"IGCSE Year 3": ["Math", "English", "Science", "History"],
		"IGCSE Year 4": ["Math", "English", "Science", "History"],
		"IGCSE Year 5": ["Math", "English", "Science", "History"],
		"IGCSE Year 6": ["Math", "English", "Science", "History"],
		"IGCSE Year 7": ["Math", "English", "Science", "History"],
		"IGCSE Year 8": ["Math", "English", "Science", "History"],
		"IGCSE Year 9": ["Math", "English", "Science", "History"],
		"IGCSE Year 10": ["Math", "English", "Science", "History"],
		"IB Year 1": [
			"HL Language A: Literature",
			"HL Language A: Language and Literature",
			"SL Language B: Chinese",
			"SL Language B: French",
			"SL Language B: Spanish",
			"SL Language B: Japanese",
			"SL Business Management",
			"SL Economics",
			"HL Economics",
			"SL Geography",
			"HL Geography",
			"SL History",
			"HL History",
			"SL Psychology",
			"HL Psychology",
			"SL Global Politics",
			"HL Global Politics",
			"SL Biology",
			"HL Biology",
			"SL Chemistry",
			"HL Chemistry",
			"SL Physics",
			"HL Physics",
			"SL Environmental Systems and Societies",
			"SL Math",
			"HL Math",
			"SL Further Math",
			"HL Further Math",
			"SL Visual Arts",
			"HL Visual Arts",
			"SL Music",
			"HL Music",
			"SL Theatre",
			"HL Theatre",
			"SL Computer Science",
			"HL Computer Science",
			"SL Design Technology",
			"HL Design Technology",
		],
		"IB Year 2": [
			"HL Language A: Literature",
			"HL Language A: Language and Literature",
			"SL Language B: Chinese",
			"SL Language B: French",
			"SL Language B: Spanish",
			"SL Language B: Japanese",
			"SL Business Management",
			"SL Economics",
			"HL Economics",
			"SL Geography",
			"HL Geography",
			"SL History",
			"HL History",
			"SL Psychology",
			"HL Psychology",
			"SL Global Politics",
			"HL Global Politics",
			"SL Biology",
			"HL Biology",
			"SL Chemistry",
			"HL Chemistry",
			"SL Physics",
			"HL Physics",
			"SL Environmental Systems and Societies",
			"SL Math",
			"HL Math",
			"SL Further Math",
			"HL Further Math",
			"SL Visual Arts",
			"HL Visual Arts",
			"SL Music",
			"HL Music",
			"SL Theatre",
			"HL Theatre",
			"SL Computer Science",
			"HL Computer Science",
			"SL Design Technology",
			"HL Design Technology",
		],
		Poly: ["Business", "Engineering", "Design"],
		University: ["Business", "Engineering", "Design"],
		Others: ["Miscellaneous"],
	};

	//TODO Redirect to main page/assignments
	//TODO: Create inputs, change onSubmit

	useEffect(() => {
		async function getDetails() {
			try {
				const response = await fetch(
					`/api/client/getDetails?clientId=${clientId}`
				);
				const data = await response.json();
				setAddress(data.address);
				setPostalCode(data.postalCode);
			} catch (error) {
				console.log(error);
			}
		}
		getDetails();
	}, [clientId, router]);

	const onBack = () => {
		const tabs = ["lessonDetails", "tutorDetails"];
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex > 0) {
			setCurrentTab(tabs[currentIndex - 1]);
		}
	};

	const onNext = () => {
		const tabs = ["lessonDetails", "tutorDetails"];
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex < tabs.length - 1) {
			setCurrentTab(tabs[currentIndex + 1]);
		}
	};

	const handleTutorChange = (type: string) => {
		if (typeOfTutor.includes(type)) {
			setTypeOfTutor(typeOfTutor.filter((t) => t !== type));
		} else {
			setTypeOfTutor([...typeOfTutor, type]);
		}
	};

	const handleRaceChange = (type: string) => {
		if (race.includes(type)) {
			setRace(race.filter((t) => t !== type));
		} else {
			setRace([...race, type]);
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const postDate = Date.now();
		let newLevel;
		if (level === "Others" || level === "Poly" || level === "University") {
			newLevel = otherLevel;
		} else {
			newLevel = level;
		}

		try {
			const res = await fetch("/api/client/postAssignments", {
				method: "POST",
				body: JSON.stringify({
					clientId,
					level: newLevel,
					subject,
					address,
					postalCode,
					minRate,
					maxRate,
					duration,
					frequency,
					additionalDetails,
					typeOfTutor,
					gender,
					race,
					availability,
					postDate,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				//TODO: Change to main page
				router.push(`/client/${clientId}/assignment/client_assignment`); // Use relative path
			} else {
				setError((await res.json()).error);
			}
		} catch (error: any) {
			setError(error?.message);
		}

		console.log("Assignment posted!");
	};

	return (
		<form onSubmit={onSubmit}>
			<Tabs
				value={currentTab}
				onValueChange={setCurrentTab}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="lessonDetails">
						Lesson Details
					</TabsTrigger>
					<TabsTrigger value="tutorDetails">
						Tutor Details
					</TabsTrigger>
				</TabsList>
				<TabsContent value="lessonDetails">
					<Card style={{ minWidth: "500px" }}>
						<CardHeader>
							<CardTitle>Lesson Details</CardTitle>
							<CardDescription>
								Fill up your lesson details. Click next when
								you&apos;re done.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-2">
								<Label htmlFor="Level">Level</Label>
								<Select
									required
									value={level}
									onValueChange={(value: string) =>
										setLevel(value)
									}
								>
									<div>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a Level" />
										</SelectTrigger>
									</div>
									<SelectContent>
										{Object.entries(levels).map(
											([category, levels]) => (
												<SelectGroup key = {category}>
													<SelectLabel>
														{category}
													</SelectLabel>
													{levels.map((level) => (
														<SelectItem
															key={level}
															value={level}
														>
															{level}
														</SelectItem>
													))}
												</SelectGroup>
											)
										)}
									</SelectContent>
								</Select>
								{level === "Others" && (
									<Input
										required
										placeholder="Enter Level (Example: Grade 5)"
										onChange={(e) =>
											setOtherLevel(e.target.value)
										}
										id="otherLevel"
										type="text"
									/>
								)}
								{(level === "Poly" ||
									level === "University") && (
									<Input
										required
										placeholder="Enter Level (Example: Y2 NUS/Y1 SP)"
										onChange={(e) =>
											setOtherLevel(e.target.value)
										}
										id="otherLevel"
										type="text"
									/>
								)}
							</div>
							{level !== "Poly" &&
								level !== "University" &&
								level !== "Others" &&
								level && (
									<div className="space-y-2">
										<Label htmlFor="Subject">Subject</Label>
										<Select
											required
											value={subject}
											onValueChange={(value) =>
												setSubject(value)
											}
										>
											<div>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a Subject" />
												</SelectTrigger>
											</div>
											<SelectContent>
												{subjectsByLevel[level].map(
													(subject: string) => (
														<SelectItem
															key={subject}
															value={subject}
														>
															{subject}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
									</div>
								)}
							{(level === "Poly" ||
								level === "University" && level) && (
								<div className="space-y-2">
									<Label htmlFor="Subject">Subject</Label>
									<Input
										required
										value={subject}
										onChange={(e) =>
											setSubject(e.target.value)
										}
										id="subject"
										type="text"
										placeholder="Please specify Module Name and Module Code (if any)"
									/>
								</div>
							)}
							{(level === "Others" && level) && (
								<div className="space-y-2">
									<Label htmlFor="Subject">Subject</Label>
									<Input
										required
										value={subject}
										onChange={(e) =>
											setSubject(e.target.value)
										}
										id="subject"
										type="text"
										placeholder="Enter Subject (Example: Piano)"
									/>
								</div>
							)}
							{/* Tutee Location */}
							<div className="space-y-2">
								<Label htmlFor="address">Address</Label>
								<Input
									required
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									id="address"
									type="text"
								/>
							</div>
							{/* Tutee Location */}
							<div className="space-y-2">
								<Label htmlFor="postalCode">Postal Code</Label>
								<Input
									required
									value={postalCode}
									onChange={(e) =>
										setPostalCode(e.target.value)
									}
									id="postalCode"
									type="text"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1 space-y-1">
									<Label htmlFor="minRate">
										Min Hourly Rate
									</Label>
									<Input
										required
										value={minRate}
										onChange={(e) =>
											setMinRate(
												parseFloat(e.target.value)
											)
										}
										id="minRate"
										type="number"
									/>
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="maxRate">
										Max Hourly Rate
									</Label>
									<Input
										required
										value={maxRate}
										onChange={(e) =>
											setMaxRate(
												parseFloat(e.target.value)
											)
										}
										id="maxRate"
										type="number"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1 space-y-1">
									<Label htmlFor="duration">Duration</Label>
									<Select
										required
										value={duration}
										onValueChange={(value: string) =>
											setDuration(value)
										}
									>
										<div>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a duration" />
											</SelectTrigger>
										</div>
										<SelectContent>
											<SelectItem value="1h">
												1h
											</SelectItem>
											<SelectItem value="1.5h">
												1.5h
											</SelectItem>
											<SelectItem value="2h">
												2h
											</SelectItem>
											<SelectItem value="2.5h">
												2.5h
											</SelectItem>
											<SelectItem value="3h">
												3h
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="maxRate">Frequency</Label>
									<Select
										required
										value={frequency}
										onValueChange={(value: string) =>
											setFrequency(value)
										}
									>
										<div>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a frequency" />
											</SelectTrigger>
										</div>
										<SelectContent>
											<SelectItem value="1x a week">
												1 Lesson/Week
											</SelectItem>
											<SelectItem value="2x a week">
												2 Lesson/Week
											</SelectItem>
											<SelectItem value="3x a week">
												3 Lesson/Week
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="additionalDetails">
									Additional Details
								</Label>
								<Input
									value={additionalDetails}
									onChange={(e) =>
										setAdditionalDetails(e.target.value)
									}
									id="additionalDetails"
									type="additionalDetails"
									placeholder="Example: Tutor to be bilingual, patient"
								/>
							</div>
							{/* Error Message */}
							{error && (
								<div className="text-red-500">{error}</div>
							)}
							{/* Submit Button */}
						</CardContent>
						<CardFooter>
							<Button onClick={onNext} className="w-full">
								Next
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="tutorDetails">
					<Card style={{ minWidth: "500px" }}>
						<CardHeader>
							<CardTitle>Tutor Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-2">
								<Label htmlFor="typeOfTutor">
									Type of Tutor
								</Label>
								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										id="Part-Time"
										checked={typeOfTutor.includes(
											"Part-Time"
										)}
										onChange={() =>
											handleTutorChange("Part-Time")
										}
										className="form-checkbox h-3 w-3 text-indigo-600"
									/>
									<label
										htmlFor="Part-Time"
										style={{ fontSize: "14px" }}
									>
										Part-Time tutor
									</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										id="Full-Time"
										checked={typeOfTutor.includes(
											"Full-Time"
										)}
										onChange={() =>
											handleTutorChange("Full-Time")
										}
										className="form-checkbox h-3 w-3 text-indigo-600"
									/>
									<label
										htmlFor="Full-Time"
										style={{ fontSize: "14px" }}
									>
										Full-Time Tutor
									</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										id="Ex/Current MOE Teacher"
										checked={typeOfTutor.includes(
											"Ex/Current MOE Teacher"
										)}
										onChange={() =>
											handleTutorChange(
												"Ex/Current MOE Teacher"
											)
										}
										className="form-checkbox h-3 w-3 text-indigo-600"
									/>
									<label
										htmlFor="Ex/Current MOE Teacher"
										style={{ fontSize: "14px" }}
									>
										Ex/Current MOE Teacher
									</label>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="gender">
									Gender Preference
								</Label>
								<Select
									required
									value={gender}
									onValueChange={(value: string) =>
										setGender(value)
									}
								>
									<div>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a gender" />
										</SelectTrigger>
									</div>
									<SelectContent>
										<SelectItem value="Male">
											Male
										</SelectItem>
										<SelectItem value="Female">
											Female
										</SelectItem>
										<SelectItem value="No Preference">
											No Preference
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="race">Race Preference</Label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="Chinese"
									checked={race.includes("Chinese")}
									onChange={() => handleRaceChange("Chinese")}
									className="form-checkbox h-3 w-3 text-indigo-600"
								/>
								<label
									htmlFor="Chinese"
									style={{ fontSize: "14px" }}
								>
									Chinese
								</label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="Malay"
									checked={race.includes("Malay")}
									onChange={() => handleRaceChange("Malay")}
									className="form-checkbox h-3 w-3 text-indigo-600"
								/>
								<label
									htmlFor="Malay"
									style={{ fontSize: "14px" }}
								>
									Malay
								</label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="Indian"
									checked={race.includes("Indian")}
									onChange={() => handleRaceChange("Indian")}
									className="form-checkbox h-3 w-3 text-indigo-600"
								/>
								<label
									htmlFor="Indian"
									style={{ fontSize: "14px" }}
								>
									Indian
								</label>
							</div>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="No Preference"
									checked={race.includes("No Preference")}
									onChange={() =>
										handleRaceChange("No Preference")
									}
									className="form-checkbox h-3 w-3 text-indigo-600"
								/>
								<label
									htmlFor="No Preference"
									style={{ fontSize: "14px" }}
								>
									No Preference
								</label>
							</div>
							<div className="space-y-2">
								<Label htmlFor="availability">
									Availability
								</Label>
								<Input
									required
									value={availability}
									onChange={(e) =>
										setAvailability(e.target.value)
									}
									id="availability"
									type="text"
									placeholder="Example: Mon - Wed: 3pm - 5pm"
								/>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between space-x-2">
							<Button onClick={onBack} className="flex-1">
								Back
							</Button>
							<Button className="flex-1">Post Assignment</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</form>
	);
};

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
import { useRouter, useParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { levels, subjectsByLevel } from "@/utils/levelsAndSubjects";

interface ClientData {
	address: string;
	unitNumber: string;
	postalCode: string;
}

export const PostAssignmentForm = ({ clientData }: { clientData: ClientData }) => {
	const router = useRouter();
	const params = useParams();
	const clientId = params.clientId;
	const [additionalDetails, setAdditionalDetails] = useState("");
	const [address, setAddress] = useState(clientData.address);
	const [unitNumber, setUnitNumber] = useState(clientData.unitNumber);
	const [postalCode, setPostalCode] = useState(clientData.postalCode);
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
	const [location, setLocation] = useState<string>("");
	type Category = keyof typeof levels;
	type Level = (typeof levels)[Category][number];
	const [level, setLevel] = useState<Level | "">("");
	const [otherLevel, setOtherLevel] = useState("");
	const [subject, setSubject] = useState("");
	const [submit, setSubmit] = useState(false);

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

	const geocodeAddress = async (address: string) => {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.MAPS_API_KEY}`
		);
		const data = await response.json();
		if (data.status === "OK") {
			const { lat, lng } = data.results[0].geometry.location;
			const locationString = `${lat},${lng}`;
			setLocation(locationString);
			console.log(location);
			return locationString;
		} else {
			setError("Invalid address, please enter a valid address");
			return null;
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmit(true);
		const postDate = Date.now();

		let newLevel;
		if (subject === "") {
			setError("Please enter a subject");
			setSubmit(false);
			return;
		}

		if (level === "Others") {
			newLevel = otherLevel;
		} else if (level === "Poly" || level === "University") {
			if (otherLevel === "") {
				setError("Please state the year and school (e.g. Y2 NUS)");
				setSubmit(false);
				return;
			}
			newLevel = level + " " + otherLevel;
		} else {
			newLevel = level;
		}

		if (maxRate < minRate) {
			setError("Max rate must be greater than min rate");
			setSubmit(false);
			return;
		}

		if (postalCode.length !== 6) {
			setError("Please enter a valid postal code");
			setSubmit(false);
			return;
		}

		if (frequency === "") {
			setError("Please enter frequency");
			setSubmit(false);
			return;
		}

		if (duration === "") {
			setError("Please enter duration");
			setSubmit(false);
			return;
		}

		let locationString = null;
		if (address) {
			locationString = await geocodeAddress(address);
			if (!locationString) {
				setError("Invalid address, please enter a valid address");
				setSubmit(false);
				return;
			}
		}

		if (availability === "") {
			setError("Please enter availability");
			setSubmit(false);
			return;
		}

		if (typeOfTutor.length === 0) {
			setError("Please select at least one type of tutor");
			setSubmit(false);
			return;
		}

		if (race.length === 0) {
			setError("Please select a race");
			setSubmit(false);
			return;
		}

		try {
			const res = await fetch("/api/client/postAssignments", {
				method: "POST",
				body: JSON.stringify({
					clientId,
					level: newLevel,
					subject,
					address,
					unitNumber,
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
					location: locationString,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				//TODO: Change to main page
				alert("Assignment posted successfully!");
				router.push(`/client/${clientId}/assignment/client_assignment`); // Use relative path
			} else {
				setError((await res.json()).error);
				setSubmit(false);
			}
		} catch (error: any) {
			setError(error?.message);
			setSubmit(false);
		}

		console.log("Assignment posted!");
	};

	const blueButton = {
		backgroundColor: "#5790AB",
		color: "#fff",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
	};
	const whiteButton = {
		backgroundColor: "#fff",
		color: "#5790AB",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		border: "1px solid #5790AB",
		width: "100%",
	};

	return (
		<form onSubmit={onSubmit}>
			<Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="lessonDetails">Lesson Details</TabsTrigger>
					<TabsTrigger value="tutorDetails">Tutor Details</TabsTrigger>
				</TabsList>
				<TabsContent value="lessonDetails">
					<Card style={{ minWidth: "500px" }}>
						<CardHeader>
							<CardTitle>Lesson Details</CardTitle>
							<CardDescription>Fill up your lesson details. Click next when you&apos;re done.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="Level">Level</Label>
								<Select required value={level} onValueChange={(value: string) => setLevel(value)}>
									<div>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a Level" />
										</SelectTrigger>
									</div>
									<SelectContent>
										{Object.entries(levels).map(([category, levels]) => (
											<SelectGroup key={category}>
												<SelectLabel>{category}</SelectLabel>
												{levels.map((level) => (
													<SelectItem key={level} value={level}>
														{level}
													</SelectItem>
												))}
											</SelectGroup>
										))}
									</SelectContent>
								</Select>
								{level === "Others" && (
									<Input
										required
										placeholder="Enter Level (Example: Grade 5)"
										onChange={(e) => setOtherLevel(e.target.value)}
										id="otherLevel"
										type="text"
									/>
								)}
								{(level === "Poly" || level === "University") && (
									<Input
										required
										placeholder="Enter Level (Example: Y2 NUS/Y1 SP)"
										onChange={(e) => setOtherLevel(e.target.value)}
										id="otherLevel"
										type="text"
									/>
								)}
							</div>
							{level !== "Poly" && level !== "University" && level !== "Others" && level && (
								<div className="space-y-2">
									<Label htmlFor="Subject">Subject</Label>
									<Select required value={subject} onValueChange={(value) => setSubject(value)}>
										<div>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a Subject" />
											</SelectTrigger>
										</div>
										<SelectContent>
											{subjectsByLevel[level].map((subject: string) => (
												<SelectItem key={subject} value={subject}>
													{subject}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							)}
							{(level === "Poly" || (level === "University" && level)) && (
								<div className="space-y-2">
									<Label htmlFor="Subject">Subject</Label>
									<Input
										required
										value={subject}
										onChange={(e) => setSubject(e.target.value)}
										id="subject"
										type="text"
										placeholder="Please specify Module Name and Module Code (if any)"
									/>
								</div>
							)}
							{level === "Others" && level && (
								<div className="space-y-2">
									<Label htmlFor="Subject">Subject</Label>
									<Input
										required
										value={subject}
										onChange={(e) => setSubject(e.target.value)}
										id="subject"
										type="text"
										placeholder="Enter Subject (Example: Piano)"
									/>
								</div>
							)}
							{/* Tutee Location */}
							<div className="space-y-2">
								<Label htmlFor="address">Address</Label>
								<Input required value={address} onChange={(e) => setAddress(e.target.value)} id="address" type="text" />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1 space-y-1">
									<Label htmlFor="unitNumber">Unit Number</Label>
									<Input
										required
										value={unitNumber}
										onChange={(e) => setUnitNumber(e.target.value)}
										id="unitNumber"
										type="unitNumber"
									/>
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="postalCode">Postal Code</Label>
									<Input
										required
										value={postalCode}
										onChange={(e) => setPostalCode(e.target.value)}
										id="postalCode"
										type="postalCode"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1 space-y-1">
									<Label htmlFor="minRate">Min Hourly Rate</Label>
									<Input
										required
										value={minRate}
										onChange={(e) => setMinRate(parseFloat(e.target.value))}
										id="minRate"
										type="number"
									/>
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="maxRate">Max Hourly Rate</Label>
									<Input
										required
										value={maxRate}
										onChange={(e) => setMaxRate(parseFloat(e.target.value))}
										id="maxRate"
										type="number"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1 space-y-1">
									<Label htmlFor="duration">Duration</Label>
									<Select required value={duration} onValueChange={(value: string) => setDuration(value)}>
										<div>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a duration" />
											</SelectTrigger>
										</div>
										<SelectContent>
											<SelectItem value="1h">1h</SelectItem>
											<SelectItem value="1.5h">1.5h</SelectItem>
											<SelectItem value="2h">2h</SelectItem>
											<SelectItem value="2.5h">2.5h</SelectItem>
											<SelectItem value="3h">3h</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="maxRate">Frequency</Label>
									<Select required value={frequency} onValueChange={(value: string) => setFrequency(value)}>
										<div>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a frequency" />
											</SelectTrigger>
										</div>
										<SelectContent>
											<SelectItem value="1x a week">1 Lesson/Week</SelectItem>
											<SelectItem value="2x a week">2 Lesson/Week</SelectItem>
											<SelectItem value="3x a week">3 Lesson/Week</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="additionalDetails">Additional Details</Label>
								<Input
									value={additionalDetails}
									onChange={(e) => setAdditionalDetails(e.target.value)}
									id="additionalDetails"
									type="additionalDetails"
									placeholder="Example: Tutor to be bilingual, patient"
								/>
							</div>
							{/* Error Message */}
							{error && <div className="text-red-500">{error}</div>}
						</CardContent>
						<CardFooter>
							<Button onClick={onNext} style={blueButton}>
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
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="typeOfTutor">Type of Tutor</Label>
								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										id="Part-Time Tutor"
										checked={typeOfTutor.includes("Part-Time Tutor")}
										onChange={() => handleTutorChange("Part-Time Tutor")}
										className="form-checkbox h-3 w-3 text-indigo-600"
									/>
									<label htmlFor="Part-Time Tutor" style={{ fontSize: "14px" }}>
										Part-Time tutor
									</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										id="Full-Time Tutor"
										checked={typeOfTutor.includes("Full-Time Tutor")}
										onChange={() => handleTutorChange("Full-Time Tutor")}
										className="form-checkbox h-3 w-3 text-indigo-600"
									/>
									<label htmlFor="Full-Time Tutor" style={{ fontSize: "14px" }}>
										Full-Time Tutor
									</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										id="Ex/Current MOE Teacher"
										checked={typeOfTutor.includes("Ex/Current MOE Teacher")}
										onChange={() => handleTutorChange("Ex/Current MOE Teacher")}
										className="form-checkbox h-3 w-3 text-indigo-600"
									/>
									<label htmlFor="Ex/Current MOE Teacher" style={{ fontSize: "14px" }}>
										Ex/Current MOE Teacher
									</label>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="gender">Gender Preference</Label>
								<Select required value={gender} onValueChange={(value: string) => setGender(value)}>
									<div>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a gender" />
										</SelectTrigger>
									</div>
									<SelectContent>
										<SelectItem value="Male">Male</SelectItem>
										<SelectItem value="Female">Female</SelectItem>
										<SelectItem value="No Preference">No Preference</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="race">Race Preference</Label>

								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										id="Chinese"
										checked={race.includes("Chinese")}
										onChange={() => handleRaceChange("Chinese")}
										className="form-checkbox h-3 w-3 text-indigo-600"
									/>
									<label htmlFor="Chinese" style={{ fontSize: "14px" }}>
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
									<label htmlFor="Malay" style={{ fontSize: "14px" }}>
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
									<label htmlFor="Indian" style={{ fontSize: "14px" }}>
										Indian
									</label>
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										id="No Preference"
										checked={race.includes("No Preference")}
										onChange={() => handleRaceChange("No Preference")}
										className="form-checkbox h-3 w-3 text-indigo-600"
									/>
									<label htmlFor="No Preference" style={{ fontSize: "14px" }}>
										No Preference
									</label>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="availability">Availability</Label>
								<Input
									required
									value={availability}
									onChange={(e) => setAvailability(e.target.value)}
									id="availability"
									type="text"
									placeholder="Example: Mon - Wed: 3pm - 5pm"
								/>
							</div>
							{/* Error Message */}
							{error && <div className="text-red-500">{error}</div>}
						</CardContent>
						<CardFooter className="flex justify-between space-x-2">
							<Button onClick={onBack} className="flex-1" style={whiteButton}>
								Back
							</Button>
							<Button className="flex-1" style={blueButton} disabled={submit}>
								{submit ? "Posting Assignment..." : "Post Assignment"}
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</form>
	);
};

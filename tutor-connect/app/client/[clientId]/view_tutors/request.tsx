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
import { FC, useState } from "react";
import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { levels, subjectsByLevel } from "@/utils/levelsAndSubjects";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

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
};

interface RequestFormProps {
	clientId: string | string[];
	tutor: Tutor;
}

export const RequestForm: FC<RequestFormProps> = ({ clientId, tutor }) => {
	const router = useRouter();
	const [additionalDetails, setAdditionalDetails] = useState("");
	const [address, setAddress] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [amount, setAmount] = useState<number>(0);
	const [duration, setDuration] = useState("");
	const [frequency, setFrequency] = useState("");
	const [currentTab, setCurrentTab] = useState("lessonDetails");
	const [availability, setAvailability] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [location, setLocation] = useState<string>("");
	type Category = keyof typeof levels;
	type Level = (typeof levels)[Category][number];
	const [level, setLevel] = useState<Level | "">("");
	const [otherLevel, setOtherLevel] = useState("");
	const [subject, setSubject] = useState("");

	//TODO Redirect to main page/assignments
	//TODO: Create inputs, change onSubmit

	useEffect(() => {
		async function getDetails() {
			try {
				const response = await fetch(`/api/client/getDetails?clientId=${clientId}`);
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

	const geocodeAddress = async (address: string) => {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.MAPS_API_KEY}`
		);
		const data = await response.json();
		if (data.status === "OK") {
			const { lat, lng } = data.results[0].geometry.location;
			const locationString = `${lat},${lng}`;
			setLocation(locationString);
			return locationString;
		} else {
			setError("Invalid address, please enter a valid address");
			return null;
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const postDate = Date.now();

		let newLevel;
		if (subject === "") {
			setError("Please enter a subject");
			return;
		}

		if (level === "Others") {
			newLevel = otherLevel;
		} else if (level === "Poly" || level === "University") {
			if (otherLevel === "") {
				setError("Please state the year and school (e.g. Y2 NUS)");
				return;
			}
			newLevel = level + " " + otherLevel;
		} else {
			newLevel = level;
		}

		if (amount > 500) {
			setError("Please enter a rate less than $500");
			return;
		}

		let locationString = null;
		if (address) {
			locationString = await geocodeAddress(address);
			if (!locationString) {
				// If geocoding fails, exit early
				setError("Invalid address, please enter a valid address");
				return;
			}
		}

		if (availability === "") {
			setError("Please enter availability");
			return;
		}

		try {
			const res = await fetch("/api/client/requestAssignment", {
				method: "POST",
				body: JSON.stringify({
					clientId,
					level: newLevel,
					subject,
					address,
					postalCode,
					minRate: amount,
					maxRate: amount,
					duration,
					frequency,
					additionalDetails,
					typeOfTutor: tutor.typeOfTutor,
					gender: tutor.gender,
					race: tutor.race,
					availability,
					postDate,
					location: locationString,
					amount,
					startDate: availability,
					tutorId: tutor.id,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				const data = await res.json();
				console.log(data);
				const notif = await fetch("/api/tutor/notifications/pickedNotification", {
					method: "POST",
					body: JSON.stringify({
						clientId,
						tutorId: tutor.id,
						assignmentId: data.assignment.id,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (notif.ok) {
					alert("Assignment sent to tutor!");
					router.push(`/client/${clientId}/assignment/client_assignment`);
				}
			} else {
				setError((await res.json()).error);
			}
		} catch (error: any) {
			setError(error?.message);
		}

		console.log("Request sent!");
	};

	const styles = {
		blueButton: {
			backgroundColor: "#5790AB",
			color: "#fff",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "100%",
			gridColumn: "span 1",
			marginTop: "10px",
		},
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button style={styles.blueButton}>Make a Request</Button>
			</DialogTrigger>
			<DialogContent className="w-full sm:w-[1400px]">
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
								<CardContent className="space-y-3">
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
											<Label htmlFor="postalCode">Postal Code</Label>
											<Input
												required
												value={postalCode}
												onChange={(e) => setPostalCode(e.target.value)}
												id="postalCode"
												type="text"
											/>
										</div>
										<div className="col-span-1 space-y-1">
											<Label htmlFor="minRate">Offered Rate</Label>
											<Input
												required
												value={amount}
												onChange={(e) => setAmount(parseFloat(e.target.value))}
												id="amount"
												type="number"
											/>
										</div>
									</div>
									{/* Error Message */}
									{error && <div className="text-red-500">{error}</div>}
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
									<CardTitle>Lesson Arrangement</CardTitle>
									<CardDescription>
										The first lesson can be scheduled after the tutor accepts and the matchmaking fee is paid.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-3">
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
										<Label htmlFor="availability">Earliest Availability</Label>
										<Input
											required
											value={availability}
											onChange={(e) => setAvailability(e.target.value)}
											id="availability"
											type="text"
											placeholder="Example: Start next week/month, flexible, Mon - Fri: after 3pm"
										/>
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
			</DialogContent>
		</Dialog>
	);
};

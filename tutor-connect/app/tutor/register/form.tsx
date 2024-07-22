"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { subjectsByCategory } from "@/utils/levelsAndSubjects";
import { locations } from "@/utils/locations";
import { Alert } from "@/components/ui/alert";

type CheckedSubjects = {
	"Pre-School": string[];
	"Primary School": string[];
	"Secondary School": string[];
	"Junior College": string[];
	"IB/IGCSE": string[];
	"Diploma/Degree": string[];
};

export const RegisterForm = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState<Date>();
	const [age, setAge] = useState("");
	const [nationality, setNationality] = useState("");
	const [gender, setGender] = useState("");
	const [race, setRace] = useState("");
	const [yearsOfExperience, setYearsOfExperience] = useState("");
	const [typeOfTutor, setTypeofTutor] = useState("");
	const [highestEducationLevel, setHighestEducationLevel] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [currentTab, setCurrentTab] = useState("personalInformation");
	const [showSubjects, setShowSubjects] = useState({
		"Pre-School": false,
		"Primary School": false,
		"Secondary School": false,
		"Junior College": false,
		"IB/IGCSE": false,
		"Diploma/Degree": false,
	});
	const [location, setLocation] = useState<string[]>([]);
	const [checkedSubjects, setCheckedSubjects] = useState<CheckedSubjects>({
		"Pre-School": [],
		"Primary School": [],
		"Secondary School": [],
		"Junior College": [],
		"IB/IGCSE": [],
		"Diploma/Degree": [],
	});

	const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;
		setShowSubjects({ ...showSubjects, [id]: checked });
	};

	const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value, checked } = event.target;
		const level = id as keyof typeof checkedSubjects;

		if (checked) {
			if (!checkedSubjects[level].includes(value)) {
				setCheckedSubjects({
					...checkedSubjects,
					[id]: [...checkedSubjects[level], value],
				});
			}
		} else {
			setCheckedSubjects({
				...checkedSubjects,
				[id]: checkedSubjects[level].filter((subject) => subject !== value),
			});
		}
	};

	const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target;

		if (checked) {
			setLocation([...location, value]);
		} else {
			setLocation(location.filter((loc) => loc !== value));
		}
	};

	const onBack = () => {
		const tabs = ["personalInformation", "tutorPreferences", "academicQualifications"];
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex > 0) {
			setCurrentTab(tabs[currentIndex - 1]);
		}
	};

	const onNext = () => {
		const tabs = ["personalInformation", "tutorPreferences", "academicQualifications"];
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex < tabs.length - 1) {
			setCurrentTab(tabs[currentIndex + 1]);
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const levelAndSubjects = checkedSubjects;

		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
			setError("Invalid email address");
			return;
		}

		if (
			password.length < 8 ||
			!/[a-z]/.test(password) ||
			!/[A-Z]/.test(password) ||
			!/[0-9]/.test(password) ||
			!/[!@#$%^&*(),.?":{}|<>]/.test(password)
		) {
			setError(
				"Your password must be at least 8 characters long, contain at least one number and one special character, and have a mixture of uppercase and lowercase letters."
			);
			return;
		}

		if (contactNumber.length !== 8) {
			setError("Contact number must be 8 digits");
			return;
		}

		if (!/^\d{2}$/.test(age)) {
			setError("Age must be a number");
			return;
		}

		if (location.length === 0) {
			setError("Please select a location");
			return;
		}

		try {
			const res = await fetch("/api/tutor/register", {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
					name,
					contactNumber,
					dateOfBirth,
					gender,
					age,
					nationality,
					race,
					levelAndSubjects,
					location,
					yearsOfExperience,
					typeOfTutor,
					highestEducationLevel,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				const response = await fetch("/api/tutor/getTutorDetails", {
					method: "POST",
					body: JSON.stringify({
						email,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await response.json();

				const updateNotif = await fetch("/api/client/notifications/updateNotification", {
					method: "POST",
					body: JSON.stringify({
						tutorId: data.id,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (data?.id) {
					const updateNotif = await fetch("/api/client/notifications/updateNotification", {
						method: "POST",
						body: JSON.stringify({
							tutorId: data.id,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});

					const account = { token: data.id };
					const SECRET = "this is a secret";
					const token = jwt.sign(account, SECRET);

					const strapiData = {
						data: {
							id: data.id,
							username: data.name,
							email: data.email,
							token: token,
							isTutor: true,
						},
					};

					const strapiResponse = await fetch("https://www.tutorconnect.live/api/accounts", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(strapiData),
					});

					if (!strapiResponse.ok) {
						throw new Error("Failed to upload to Strapi");
					}

					const strapiResponseData = await strapiResponse.json();
					console.log(strapiResponseData); // Outputs the result
					console.log("Upload to Strapi success");

					router.push("/tutor/verify_email?tutortId=" + data.id);
				} else {
					setError("Failed to retrieve user information");
				}
			} else {
				setError((await res.json()).error);
			}
		} catch (error: any) {
			setError(error?.message);
		}

		console.log("Register!");
	};

	const locationStyle = {
		container: {
			display: "grid",
			gridTemplateColumns: "repeat(1, 1fr)",
			gap: "10px",
			padding: "20px",
			backgroundColor: "#eff8fa",
			maxWidth: "1150px",
		},
		checkboxes: {
			marginRight: "10px",
		},
		places: {
			marginLeft: "24px",
			fontSize: "14px",
			color: "#909090",
			textAlign: "justify" as "justify",
			display: "block",
		},
	};

	const subjectStyle = {
		container: {
			display: "grid",
			gridTemplateColumns: "repeat(4, 1fr)",
			gap: "10px",
			padding: "20px",
			marginTop: "10px",
			backgroundColor: "#eff8fa",
		},
		checkboxes: {
			marginRight: "10px",
		},
	};

	return (
		<form onSubmit={onSubmit}>
			<Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="personalInformation">Personal Information</TabsTrigger>
					<TabsTrigger value="tutorPreferences">Tutor Preferences</TabsTrigger>
					<TabsTrigger value="academicQualifications">Academic Qualifications</TabsTrigger>
				</TabsList>
				<TabsContent value="personalInformation">
					<Card>
						<CardHeader>
							<CardTitle>Personal Information</CardTitle>
							<CardDescription>Fill up your personal information. Click next when you&apos;re done.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">Name</Label>
								<Input required value={name} onChange={(e) => setName(e.target.value)} id="name" type="name" />
							</div>
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input required value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" />
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Password</Label>
								<Input required value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1 space-y-1">
									<Label htmlFor="contactNumber">Contact Number</Label>
									<Input
										required
										value={contactNumber}
										onChange={(e) => setContactNumber(e.target.value)}
										id="contactNumber"
										type="contactNumber"
									/>
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="dateOfBirth">Date Of Birth</Label>
									<Popover>
										<PopoverTrigger asChild>
											<div>
												<Button
													type="button"
													variant={"outline"}
													className={cn(
														"w-[240px] justify-start text-left font-normal",
														!dateOfBirth && "text-muted-foreground"
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{dateOfBirth ? dateOfBirth.toLocaleDateString("en-GB") : <span>Pick a date</span>}
												</Button>
											</div>
										</PopoverTrigger>
										<PopoverContent align="start" className=" w-auto p-0">
											<Calendar
												mode="single"
												captionLayout="dropdown-buttons"
												selected={dateOfBirth}
												onSelect={setDateOfBirth}
												fromYear={1960}
												toYear={2030}
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1 space-y-1">
									<Label htmlFor="age">Age</Label>
									<Input required value={age} onChange={(e) => setAge(e.target.value)} id="age" type="age" />
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="gender">Gender</Label>
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
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1 space-y-1">
									<Label htmlFor="nationality">Nationality</Label>
									<Select required value={nationality} onValueChange={(value: string) => setNationality(value)}>
										<div>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a nationality" />
											</SelectTrigger>
										</div>
										<SelectContent>
											<SelectItem value="Singaporean">Singaporean</SelectItem>
											<SelectItem value="Singapore PR">Singapore PR</SelectItem>
											<SelectItem value="Others">Others</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="race">Race</Label>
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
							{error && (
								<div style={{ maxWidth: "1150px" }}>
									<Alert>{error}</Alert>
								</div>
							)}
						</CardContent>
						<CardFooter>
							<Button onClick={onNext} className="w-full">
								Next
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="tutorPreferences">
					<Card>
						<CardHeader>
							<CardTitle>Tutor Preferences</CardTitle>
						</CardHeader>
						<CardContent className="space-y-5">
							<div className="space-y-1">
								<Label htmlFor="levelsAndSubjects" style={{ fontSize: "20px" }}>
									Levels and Subjects
								</Label>
								{Object.entries(subjectsByCategory).map(([category, subjects]) => (
									<div key={category} style={{ marginTop: "10px" }}>
										<label key={category}>
											<input
												type="checkbox"
												id={category}
												onChange={handleLevelChange}
												style={subjectStyle.checkboxes}
												checked={showSubjects[category as keyof CheckedSubjects]}
											/>
											{category}
										</label>
										{showSubjects[category as keyof CheckedSubjects] && (
											<div style={subjectStyle.container}>
												{subjects.map((subject) => (
													<label key={subject}>
														<input
															type="checkbox"
															id={category}
															value={subject}
															onChange={handleSubjectChange}
															style={subjectStyle.checkboxes}
															checked={checkedSubjects[category as keyof CheckedSubjects].includes(subject)}
														/>
														{subject}
													</label>
												))}
											</div>
										)}
									</div>
								))}
							</div>
							<div className="space-y-1">
								<Label htmlFor="location" style={{ fontSize: "20px" }}>
									Locations
								</Label>
								<div style={locationStyle.container}>
									{locations.map((loc) => (
										<div key={loc[0]}>
											<label key={loc[0]}>
												<input
													type="checkbox"
													value={loc[0]}
													onChange={handleLocationChange}
													style={locationStyle.checkboxes}
													required
													checked={location.includes(loc[0])}
												/>
												{loc[0]}
												<span style={locationStyle.places}>{loc[1]}</span>
											</label>
										</div>
									))}
								</div>
							</div>
							{error && (
								<div style={{ maxWidth: "1150px" }}>
									<Alert>{error}</Alert>
								</div>
							)}
						</CardContent>
						<CardFooter className="flex justify-between space-x-2">
							<Button onClick={onBack} className="flex-1">
								Back
							</Button>
							<Button onClick={onNext} className="flex-1">
								Next
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="academicQualifications">
					<Card>
						<CardHeader>
							<CardTitle>Academic Qualifications</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="yearsOfExperience">Years of Teaching Experience</Label>
								<Input
									required
									value={yearsOfExperience}
									onChange={(e) => setYearsOfExperience(e.target.value)}
									id="yearsOfExperience"
									type="yearsOfExperience"
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="typeOfTutor">Type of Tutor</Label>
								<Select required value={typeOfTutor} onValueChange={(value: string) => setTypeofTutor(value)}>
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
							<div className="space-y-1">
								<Label htmlFor="highestEducationLevel">Highest Education Level</Label>
								<Select required value={highestEducationLevel} onValueChange={(value: string) => setHighestEducationLevel(value)}>
									<div>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select an education level" />
										</SelectTrigger>
									</div>
									<SelectContent>
										<SelectItem value="Diploma">Poly Diploma</SelectItem>
										<SelectItem value="A levels">A Levels</SelectItem>
										<SelectItem value="Undergraduate">Undergraduate</SelectItem>
										<SelectItem value="Bachelor Degree">Bachelor Degree</SelectItem>
										<SelectItem value="Post-Graduate Diploma">Post-Graduate Diploma</SelectItem>
										<SelectItem value="Masters Degree">Masters Degree</SelectItem>
										<SelectItem value="PHD">PHD</SelectItem>
										<SelectItem value="Others">Others</SelectItem>
									</SelectContent>
								</Select>
							</div>
							{error && (
								<div style={{ maxWidth: "1150px" }}>
									<Alert>{error}</Alert>
								</div>
							)}
						</CardContent>
						<CardFooter className="flex justify-between space-x-2">
							<Button onClick={onBack} className="flex-1">
								Back
							</Button>
							<Button className="flex-1">Register</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</form>
	);
};

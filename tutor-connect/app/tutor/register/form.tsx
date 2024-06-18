"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

type CheckedSubjects = {
	preschool: string[];
	primary: string[];
	secondary: string[];
	jc: string[];
	ib: string[];
	diplomaOrDegree: string[];
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
		preschool: false,
		primary: false,
		secondary: false,
		jc: false,
		ib: false,
		diplomaOrDegree: false,
	});
	const [showLocation, setShowLocation] = useState({
		North: false,
		South: false,
		East: false,
		West: false,
		Central: false,
		NorthWest: false,
		NorthEast: false,
	});
	const [location, setLocation] = useState<string[]>([]);
	const [checkedSubjects, setCheckedSubjects] = useState<CheckedSubjects>({
		preschool: [],
		primary: [],
		secondary: [],
		jc: [],
		ib: [],
		diplomaOrDegree: [],
	});

	const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;
		setShowSubjects({ ...showSubjects, [id]: checked });
		console.log(showSubjects);
	};

	const handleSubjectChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { id, value, checked } = event.target;
		const level = id as keyof typeof checkedSubjects;
		
		if (checked) {
			// Check if the value is already in the array
			if (!checkedSubjects[level].includes(value)) {
			  setCheckedSubjects({
				...checkedSubjects,
				[id]: [...checkedSubjects[level], value], // Add value to the array for the selected level
			  });
			}
		} else {
			setCheckedSubjects({
				...checkedSubjects,
				[id]: checkedSubjects[level].filter(
					(subject) => subject !== value
				),
			});
		}
		console.log(checkedSubjects);
	};

	const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target;
		setShowLocation({ ...showLocation, [value]: checked });

		if (checked) {
			setLocation([...location, value]);
		} else {
			setLocation(location.filter((loc) => loc !== value));
		}
	};

	const preschoolSubjects = [
		"English",
		"Math",
		"Chinese",
		"Tamil",
		"Malay",
		"Phonics",
		"Creative Writing",
	];

	const primarySchoolSubjects = [
		"English",
		"Math",
		"Science",
		"Chinese",
		"Higher Chinese",
		"Tamil",
		"Higher Tamil",
		"Malay",
		"Higher Malay",
		"Hindi",
		"Art",
		"Creative Writing",
		"GEP",
		"Math Olympiad",
		"Science Olympiad",
	];

	const secondarySchoolSubjects = [
		"English",
		"L. Sec Math",
		"L. Sec Science",
		"A Math",
		"E Math",
		"Physics",
		"Chemistry",
		"Biology",
		"Physics/Chemistry",
		"Biology/Chemistry",
		"Biology/Physics",
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
		"Design and Technology",
		"Food and Nutrition",
	];

	const jcSubjects = [
		"General Paper",
		"Math",
		"Chemistry",
		"Physics",
		"Biology",
		"Computing",
		"Economics",
		"History",
		"Geography",
		"Literature",
		"Chinese",
		"Chinese Studies",
		"Malay",
		"Malay Studies",
		"Tamil",
		"Tamil Studies",
		"Knowledge & Inquiry",
		"Art",
		"H3 Math",
		"H3 Physics",
		"H3 Chemistry",
		"H3 Biology",
		"H3 Economics",
		"H3 History",
		"H3 Geography",
		"H3 English Literature",
		"H3 Chinese Language & Literature",
		"H3 Art",
	];

	const ibSubjects = [
		"English",
		"English Literature",
		"Chinese",
		"Malay",
		"Tamil",
		"Business Management",
		"Economics",
		"Geography",
		"History",
		"Biology",
		"Chemistry",
		"Physics",
		"Computer Science",
		"Math",
		"Art",
	];

	const diplomaOrDegreeSubjects = [
		"Business Admin",
		"Accounting",
		"Finance",
		"Marketing",
		"Human Resource",
		"Mass Communication",
		"Engineering",
		"Computer Science",
		"Information Technology",
		"Law",
		"Psychology",
		"Math",
		"Applied Math",
		"Statistics",
		"Physics",
		"Chemistry",
		"Biology",
		"Geography",
		"History",
		"Literature",
		"Economics",
		"Architecture",
		"Real Estate",
		"Sociology",
		"Medicine",
		"Biological Science",
		"Chemical Engineering",
		"Electrical Engineering",
		"Mechanical Engineering",
		"Life Science",
		"Communication Studies",
	];

	const locations = [
		[
			"North",
			"Kranji, Marsiling, Woodlands, Admiralty, Sembawang, Yishun, Khatib, Yio Chu Kang, Ang Mo Kio",
		],
		[
			"South",
			"Harbourfront, Telok Blangah, Pasir Panjang, Labrador Park, Mount Faber, West Coast, Sentosa Cove, Tiong Bahru, Bukit Merah",
		],
		[
			"East",
			"Pasir Ris, Tampines, Simei, Tanah Merah, Bedok, Kembangan, Eunos, Paya Lebar, Aljunied, Kallang, Geylang, Katong, Joo Chiat, Marine Parade, Siglap, Bedok, Chai Chee, East Coast, Kaki Bukit, Ubi, Dakota",
		],
		[
			"West",
			"Boon Lay, Jurong, Clementi, Dover, Buona Vista, Commonwealth, Queenstown, Redhill, Alexandra, Kent Ridge, Farrer Rd, Holland, Ghim Moh",
		],
		[
			"Central",
			"Bishan, Braddell, Toa Payoh, Balestier, Novena, Newton, Orchard, Chinatown, Stevens, Bendemeer, Bartley, Macpherson, Lorong Chuan, Bartley, Tai Seng, Tanjong Rhu, Bugis, Lavender, Boon Keng, Farrer Park, Little India, Marymount, Jalan Besar, Caldecott, Botanic Gardens, Farrer Road, Holland Village, Thomson Road, Bukit Timah Road, Stevens Road, River Valley, Marina Bay, City Hall, Raffles Place, Shenton Way, Outram, Clarke Quay",
		],
		[
			"NorthWest",
			"Bukit Batok, Bukit Gombak, Hillview, Bukit Panjang, Choa Chu Kang, Yew Tee, Cashew, Beauty World",
		],
		[
			"NorthEast",
			"Punggol, Sengkang, Buangkok, Hougang, Kovan, Potong Pasir, Woodleigh, Serangoon, Seletar",
		],
	];

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

	const onBack = () => {
		const tabs = [
			"personalInformation",
			"tutorPreferences",
			"academicQualifications",
		];
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex > 0) {
			setCurrentTab(tabs[currentIndex - 1]);
		}
	};

	const onNext = () => {
		const tabs = [
			"personalInformation",
			"tutorPreferences",
			"academicQualifications",
		];
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex < tabs.length - 1) {
			setCurrentTab(tabs[currentIndex + 1]);
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const levelAndSubjects = checkedSubjects;
		console.log(location);
		console.log(checkedSubjects);

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
				if (data?.id) {
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

	return (
		<form onSubmit={onSubmit}>
			<Tabs
				value={currentTab}
				onValueChange={setCurrentTab}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="personalInformation">
						Personal Information
					</TabsTrigger>
					<TabsTrigger value="tutorPreferences">
						Tutor Preferences
					</TabsTrigger>
					<TabsTrigger value="academicQualifications">
						Academic Qualifications
					</TabsTrigger>
				</TabsList>
				<TabsContent value="personalInformation">
					<Card>
						<CardHeader>
							<CardTitle>Personal Information</CardTitle>
							<CardDescription>
								Fill up your personal information. Click next
								when you're done.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">Name</Label>
								<Input
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									id="name"
									type="name"
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									type="email"
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Password</Label>
								<Input
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									id="password"
									type="password"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1 space-y-1">
									<Label htmlFor="contactNumber">
										Contact Number
									</Label>
									<Input
										required
										value={contactNumber}
										onChange={(e) =>
											setContactNumber(e.target.value)
										}
										id="contactNumber"
										type="contactNumber"
									/>
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="dateOfBirth">
										Date Of Birth (MM-DD-YYYY)
									</Label>
									<Popover>
										<PopoverTrigger asChild>
											<div>
												<Button
													type="button"
													variant={"outline"}
													className={cn(
														"w-[240px] justify-start text-left font-normal",
														!dateOfBirth &&
															"text-muted-foreground"
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{dateOfBirth ? (
														dateOfBirth.toLocaleDateString()
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</div>
										</PopoverTrigger>
										<PopoverContent
											align="start"
											className=" w-auto p-0"
										>
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
									<Input
										required
										value={age}
										onChange={(e) => setAge(e.target.value)}
										id="age"
										type="age"
									/>
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="gender">Gender</Label>
									<Select
										required
										value={gender}
										onChange={(
											e: React.ChangeEvent<HTMLSelectElement>
										) => setGender(e.target.value)}
										onValueChange={setGender}
										id="gender"
										type="gender"
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
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="col-span-1 space-y-1">
									<Label htmlFor="nationality">
										Nationality
									</Label>
									<Select
										required
										value={nationality}
										onChange={(
											e: React.ChangeEvent<HTMLSelectElement>
										) => setNationality(e.target.value)}
										onValueChange={setNationality}
										id="nationality"
										type="nationality"
									>
										<div>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a nationality" />
											</SelectTrigger>
										</div>
										<SelectContent>
											<SelectItem value="Singaporean">
												Singaporean
											</SelectItem>
											<SelectItem value="Singapore PR">
												Singapore PR
											</SelectItem>
											<SelectItem value="Others">
												Others
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="col-span-1 space-y-1">
									<Label htmlFor="race">Race</Label>
									<Select
										required
										value={race}
										onChange={(
											e: React.ChangeEvent<HTMLSelectElement>
										) => setRace(e.target.value)}
										onValueChange={setRace}
										id="race"
										type="race"
									>
										<div>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a race" />
											</SelectTrigger>
										</div>
										<SelectContent>
											<SelectItem value="Chinese">
												Chinese
											</SelectItem>
											<SelectItem value="Malay">
												Malay
											</SelectItem>
											<SelectItem value="Indian">
												Indian
											</SelectItem>
											<SelectItem value="Others">
												Others
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
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
								<Label
									htmlFor="levelsAndSubjects"
									style={{ fontSize: "20px" }}
								>
									Levels and Subjects
								</Label>
								<div style={{ marginTop: "10px" }}>
									<label>
										<input
											type="checkbox"
											id="preschool"
											onChange={handleLevelChange}
											style={{ marginRight: "10px" }}
											checked={showSubjects.preschool}
										/>
										Pre-School
									</label>
								</div>
								{showSubjects.preschool && (
									<div style={subjectStyle.container}>
										{preschoolSubjects.map((subject) => (
											<label key={subject}>
												<input
													type="checkbox"
													id="preschool"
													value={subject}
													onChange={
														handleSubjectChange
													}
													style={
														subjectStyle.checkboxes
													}
													checked={checkedSubjects.preschool.includes(
														subject
													)}
												/>
												{subject}
											</label>
										))}
									</div>
								)}
								<div>
									<label>
										<input
											type="checkbox"
											id="primary"
											onChange={handleLevelChange}
											style={subjectStyle.checkboxes}
											checked={showSubjects.primary}
										/>
										Primary School
									</label>
								</div>
								{showSubjects.primary && (
									<div style={subjectStyle.container}>
										{primarySchoolSubjects.map(
											(subject) => (
												<label key={subject}>
													<input
														type="checkbox"
														id="primary"
														value={subject}
														onChange={
															handleSubjectChange
														}
														style={
															subjectStyle.checkboxes
														}
														checked={checkedSubjects.primary.includes(
															subject
														)}
													/>
													{subject}
												</label>
											)
										)}
									</div>
								)}
								<div>
									<label>
										<input
											type="checkbox"
											id="secondary"
											onChange={handleLevelChange}
											style={subjectStyle.checkboxes}
											checked={showSubjects.secondary}
										/>
										Secondary School
									</label>
								</div>
								{showSubjects.secondary && (
									<div style={subjectStyle.container}>
										{secondarySchoolSubjects.map(
											(subject) => (
												<label key={subject}>
													<input
														type="checkbox"
														id="secondary"
														value={subject}
														onChange={
															handleSubjectChange
														}
														style={
															subjectStyle.checkboxes
														}
														checked={checkedSubjects.secondary.includes(
															subject
														)}
													/>
													{subject}
												</label>
											)
										)}
									</div>
								)}
								<div>
									<label>
										<input
											type="checkbox"
											id="jc"
											onChange={handleLevelChange}
											style={subjectStyle.checkboxes}
											checked={showSubjects.jc}
										/>
										Junior College
									</label>
								</div>
								{showSubjects.jc && (
									<div style={subjectStyle.container}>
										{jcSubjects.map((subject) => (
											<label key={subject}>
												<input
													type="checkbox"
													id="jc"
													value={subject}
													onChange={
														handleSubjectChange
													}
													style={
														subjectStyle.checkboxes
													}
													checked={checkedSubjects.jc.includes(
														subject
													)}
												/>
												{subject}
											</label>
										))}
									</div>
								)}
								<div>
									<label>
										<input
											type="checkbox"
											id="ib"
											onChange={handleLevelChange}
											style={subjectStyle.checkboxes}
											checked={showSubjects.ib}
										/>
										IB/IGCSE
									</label>
								</div>
								{showSubjects.ib && (
									<div style={subjectStyle.container}>
										{ibSubjects.map((subject) => (
											<label key={subject}>
												<input
													type="checkbox"
													id="ib"
													value={subject}
													onChange={
														handleSubjectChange
													}
													style={
														subjectStyle.checkboxes
													}
													checked={checkedSubjects.ib.includes(
														subject
													)}
												/>
												{subject}
											</label>
										))}
									</div>
								)}
								<div>
									<label>
										<input
											type="checkbox"
											id="diplomaOrDegree"
											onChange={handleLevelChange}
											style={subjectStyle.checkboxes}
											checked={
												showSubjects.diplomaOrDegree
											}
										/>
										Diploma/Degree
									</label>
								</div>
								{showSubjects.diplomaOrDegree && (
									<div style={subjectStyle.container}>
										{diplomaOrDegreeSubjects.map(
											(subject) => (
												<label key={subject}>
													<input
														type="checkbox"
														id="diplomaOrDegree"
														value={subject}
														onChange={
															handleSubjectChange
														}
														style={
															subjectStyle.checkboxes
														}
														checked={checkedSubjects.diplomaOrDegree.includes(
															subject
														)}
													/>
													{subject}
												</label>
											)
										)}
									</div>
								)}
							</div>
							<div className="space-y-1">
								<Label
									htmlFor="location"
									style={{ fontSize: "20px" }}
								>
									Locations
								</Label>
								<div style={locationStyle.container}>
									{locations.map((loc) => (
										<div>
											<label key={loc[0]}>
												<input
													type="checkbox"
													value={loc[0]}
													onChange={
														handleLocationChange
													}
													style={
														locationStyle.checkboxes
													}
													required
													checked={location.includes(
														loc[0]
													)}
												/>
												{loc[0]}
												<div
													style={locationStyle.places}
												>
													<label>{loc[1]}</label>
												</div>
											</label>
										</div>
									))}
								</div>
							</div>
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
								<Label htmlFor="yearsOfExperience">
									Years of Teaching Experience
								</Label>
								<Input
									required
									value={yearsOfExperience}
									onChange={(e) =>
										setYearsOfExperience(e.target.value)
									}
									id="yearsOfExperience"
									type="yearsOfExperience"
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="typeOfTutor">
									Type of Tutor
								</Label>
								<Select
									required
									value={typeOfTutor}
									onChange={(
										e: React.ChangeEvent<HTMLSelectElement>
									) => setTypeofTutor(e.target.value)}
									onValueChange={setTypeofTutor}
									id="typeOfTutor"
									type="typeOfTutor"
								>
									<div>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a type" />
										</SelectTrigger>
									</div>
									<SelectContent>
										<SelectItem value="Poly/A level">
											Poly / A Level student
										</SelectItem>
										<SelectItem value="Undergraduate">
											Undergraduate
										</SelectItem>
										<SelectItem value="Part-Time">
											Part-Time Tutor
										</SelectItem>
										<SelectItem value="Full-Time">
											Full-Time Tutor
										</SelectItem>
										<SelectItem value="NIE Trainee">
											NIE Trainee
										</SelectItem>
										<SelectItem value="Ex-MOE">
											Ex-MOE Teacher
										</SelectItem>
										<SelectItem value="Current MOE">
											Current MOE Teacher
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-1">
								<Label htmlFor="highestEducationLevel">
									Highest Education Level
								</Label>
								<Select
									required
									value={highestEducationLevel}
									onChange={(
										e: React.ChangeEvent<HTMLSelectElement>
									) =>
										setHighestEducationLevel(e.target.value)
									}
									onValueChange={setHighestEducationLevel}
									id="highestEducationLevel"
									type="highestEducationLevel"
								>
									<div>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select an education level" />
										</SelectTrigger>
									</div>
									<SelectContent>
										<SelectItem value="Diploma">
											Poly Diploma
										</SelectItem>
										<SelectItem value="A levels">
											A Levels
										</SelectItem>
										<SelectItem value="Undergraduate">
											Undergraduate
										</SelectItem>
										<SelectItem value="Bachelor Degree">
											Bachelor Degree
										</SelectItem>
										<SelectItem value="Post-Graduate Diploma">
											Post-Graduate Diploma
										</SelectItem>
										<SelectItem value="Masters Degree">
											Masters Degree
										</SelectItem>
										<SelectItem value="PHD">PHD</SelectItem>
										<SelectItem value="Others">
											Others
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
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

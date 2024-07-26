"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/footer/footer";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { PutBlobResult } from "@vercel/blob";
import { subjectsByCategory } from "@/utils/levelsAndSubjects";
import { locations } from "@/utils/locations";

type CheckedSubjects = {
	"Pre-School": string[];
	"Primary School": string[];
	"Secondary School": string[];
	"Junior College": string[];
	"IB/IGCSE": string[];
	"Diploma/Degree": string[];
};

export default function ProfilePage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const [error1, setError1] = useState<string | null>(null);
	const [error2, setError2] = useState<string | null>(null);
	const [error3, setError3] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState<Date>();
	const [age, setAge] = useState("");
	const [nationality, setNationality] = useState("");
	const [gender, setGender] = useState("");
	const [race, setRace] = useState("");
	const [yearsOfExperience, setYearsOfExperience] = useState("");
	const [typeOfTutor, setTypeofTutor] = useState("");
	const [highestEducationLevel, setHighestEducationLevel] = useState("");
	const [image, setImage] = useState("");
	const [newImage, setNewImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [showSubjects, setShowSubjects] = useState({
		"Pre-School": false,
		"Primary School": false,
		"Secondary School": false,
		"Junior College": false,
		"IB/IGCSE": false,
		"Diploma/Degree": false,
	});
	const [checkedSubjects, setCheckedSubjects] = useState<CheckedSubjects>({
		"Pre-School": [],
		"Primary School": [],
		"Secondary School": [],
		"Junior College": [],
		"IB/IGCSE": [],
		"Diploma/Degree": [],
	});
	const [location, setLocation] = useState<string[]>([]);
	const maxWords = 100;
	const [introduction, setIntroduction] = useState("");
	const [summary, setSummary] = useState("");
	const [studentsResults, setStudentsResults] = useState("");

	useEffect(() => {
		const fetchTutorDetails = async () => {
			if (status === "authenticated" && session?.user?.email) {
				try {
					const res = await fetch("/api/tutor/getTutorDetails", {
						method: "POST",
						body: JSON.stringify({
							email: session.user.email,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (res.ok) {
						const tutorData = await res.json();
						if (tutorData) {
							setName(tutorData.name);
							setImage(tutorData.image);
							setEmail(tutorData.email);
							setContactNumber(String(tutorData.contactNumber));
							setDateOfBirth(new Date(tutorData.dateOfBirth));
							setGender(tutorData.gender);
							setAge(tutorData.age);
							setNationality(tutorData.nationality);
							setRace(tutorData.race);
							setYearsOfExperience(tutorData.yearsOfExperience);
							setTypeofTutor(tutorData.typeOfTutor);
							setHighestEducationLevel(tutorData.highestEducationLevel);
							setLocation(tutorData.location);
							setCheckedSubjects(tutorData.levelAndSubjects);
							for (const level in tutorData.levelAndSubjects) {
								if (tutorData.levelAndSubjects[level].length > 0) {
									setShowSubjects((prevShowSubjects) => ({
										...prevShowSubjects,
										[level]: true,
									}));
								}
							}
							setIntroduction(tutorData.introduction);
							setSummary(tutorData.summary);
							setStudentsResults(tutorData.studentsResults);
						} else {
							console.error("Failed to fetch tutor details");
						}
					} else {
						console.error("Failed to fetch tutor details");
					}
				} catch (error) {
					console.error("Error fetching tutor details:", error);
				}
			}
		};
		fetchTutorDetails();
	}, [session, status]);

	const handleMouseEnter = (index: number) => {
		setHoverIndex(index);
	};

	const handleMouseLeave = () => {
		setHoverIndex(null);
	};

	const hoverText = (index: number) => ({
		backgroundColor: hoverIndex === index ? "#f0f0f0" : "#ffffff",
		borderRadius: "10px",
	});

	const handleResetPassword = () => {
		router.push("/tutor/forgot_password");
	};

	const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
		const text = event.target.value;
		const words = text.trim().split(/\s+/);
		if (words.length <= maxWords) {
			setState(text);
		} else {
			setError2("Maximum word limit exceeded");
		}
	};

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			const maxSize = 2 * 1024 * 1024;

			if (file.size > maxSize) {
				alert("File size exceeds 2MB");
				return;
			}

			const previewURL = URL.createObjectURL(file);
			setPreview(previewURL);
			setNewImage(file);
			return;
		}
	};

	const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;
		setShowSubjects({ ...showSubjects, [id]: checked });
		console.log(showSubjects);
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
		console.log(showSubjects);
		console.log(checkedSubjects);
	};

	const savePersonalInformation = async (e: React.FormEvent) => {
		e.preventDefault();

		if (contactNumber.length !== 8) {
			setError1("Contact number must be 8 digits");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("email", email);
			formData.append("contactNumber", contactNumber);
			formData.append("dateOfBirth", dateOfBirth?.toISOString() || "");
			formData.append("gender", gender);
			formData.append("age", age);
			formData.append("nationality", nationality);
			formData.append("race", race);

			if (newImage) {
				if (image) {
					const deleteRes = await fetch(`/api/tutor/profile/image_upload`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ image }),
					});

					if (!deleteRes.ok) {
						alert("Failed to delete old image");
						return;
					}
				}

				const imageRes = await fetch(`/api/tutor/profile/image_upload?filename=${newImage.name}`, {
					method: "POST",
					body: newImage,
				});

				if (imageRes.ok) {
					const imageBlob: PutBlobResult = await imageRes.json();
					formData.append("image", imageBlob.url);
				} else {
					alert("Failed to upload new image");
					return;
				}
			}
			console.log(formData);
			const res = await fetch("/api/tutor/profile/personal_information", {
				method: "POST",
				body: formData,
			});
			if (res.ok) {
				alert("Changes saved successfully");
				router.refresh();
			} else {
				alert("Failed to save changes");
			}
		} catch (error) {
			console.error("Error updating tutor details:", error);
		}
	};

	const saveTutorPreferences = async (e: React.FormEvent) => {
		e.preventDefault();
		const levelAndSubjects = checkedSubjects;

		if (introduction.trim().split(/\s+/).length > 100) {
			setError2("Max word limit exceeded for Short Introduction of yourself.");
			return;
		}

		if (summary.trim().split(/\s+/).length > 100) {
			setError2("Max word limit exceeded for Summary of Teaching Experiences and Academic Achievements.");
			return;
		}

		if (studentsResults.trim().split(/\s+/).length > 100) {
			setError2("Max word limit exceeded for Past Students' Results.");
			return;
		}

		try {
			const res = await fetch("/api/tutor/profile/preferences", {
				method: "POST",
				body: JSON.stringify({
					email,
					location,
					levelAndSubjects,
					introduction,
					summary,
					studentsResults,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				alert("Changes saved successfully");
				router.refresh();
			} else {
				alert("Failed to save changes");
			}
		} catch {
			console.error("Error updating tutor preferences:", error2);
		}
	};

	const savecademicQualificationsChanges = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch("/api/tutor/profile/academic_qualifications", {
				method: "POST",
				body: JSON.stringify({
					email,
					yearsOfExperience,
					typeOfTutor,
					highestEducationLevel,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				alert("Changes saved successfully");
				router.refresh();
			} else {
				alert("Failed to save changes");
			}
		} catch (error) {
			console.error("Error updating tutor academic qualifications:", error);
		}
	};

	const sidebar = {
		container: {
			display: "flex",
			flexDirection: "column" as "column",
			marginRight: "20px",
			padding: "20px",
		},
		card: {
			width: "230px",
			backgroundColor: "#fff",
			borderRadius: "10px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
			fontFamily: "Poppins",
			border: "1px solid #d9d9d9",
		},
		title: {
			fontSize: "24px",
			marginBottom: "10px",
			fontWeight: "bold",
			marginLeft: "8px",
		},
		current: {
			backgroundColor: "#f0f0f0",
			borderRadius: "10px",
		},
		navLink: {
			display: "flex",
			alignItems: "center",
			textDecoration: "none",
			color: "#000",
			fontSize: "16px",
			padding: "10px",
			paddingLeft: "15px",
		},
		divider: {
			borderBottom: "1px solid #d9d9d9",
		},
		icon: {
			marginRight: "10px",
		},
	};

	const profileCard = {
		layout: {
			display: "flex",
			flexDirection: "column" as "column",
		},
		container: {
			display: "flex",
			justifyContent: "center",
			alignItems: "flex-start",
		},
		card: {
			backgroundColor: "#fff",
			borderRadius: "10px",
			padding: "20px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
			width: "750px",
		},
		profileImage: {
			width: "100px",
			height: "100px",
			borderRadius: "50%",
			backgroundColor: "#fff",
			position: "relative" as "relative",
			margin: "0 auto",
			marginBottom: "20px",
		},
		editIcon: {
			position: "absolute" as "absolute",
			bottom: "0",
			right: "10px",
			backgroundColor: "#fff",
			borderRadius: "50%",
			padding: "5px",
			boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
		},
		tutorName: {
			fontSize: "24px",
			fontWeight: "bold",
			marginBottom: "20px",
			textAlign: "center" as "center",
		},
		form: {
			display: "flex",
			flexDirection: "column" as "column",
			alignItems: "flex-start",
		},
		label: {
			alignSelf: "flex-start",
			marginBottom: "5px",
			fontSize: "13px",
			fontFamily: "Inter",
			textAlign: "left",
		},
		input: {
			width: "100%",
			padding: "6px",
			marginTop: "7px",
			marginBottom: "10px",
			borderRadius: "5px",
			border: "1px solid #ccc",
		},
		buttonContainer: {
			display: "flex",
			justifyContent: "space-between",
			width: "100%",
			marginTop: "10px",
		},
		saveButton: {
			width: "49.5%",
			padding: "10px",
			backgroundColor: "#5790AB",
			color: "#fff",
			border: "none",
			borderRadius: "5px",
			fontWeight: "bold",
			cursor: "pointer",
		},
		resetPasswordButton: {
			width: "49.5%",
			padding: "10px",
			backgroundColor: "#FFFFFF",
			color: "#5790AB",
			border: "1px solid #5790AB",
			borderRadius: "5px",
			fontWeight: "bold",
			cursor: "pointer",
		},
		buttonFull: {
			width: "100%",
			padding: "10px",
			backgroundColor: "#5790AB",
			color: "#fff",
			border: "none",
			borderRadius: "5px",
			fontWeight: "bold",
			cursor: "pointer",
		},
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

	const questionStyle = {
		title: {
			fontSize: "17px",
		},
		subtitle: {
			fontSize: "14px",
			color: "#909090",
			textAlign: "justify" as "justify",
			display: "block",
		},
		inputArea: {
			width: "100%",
			padding: "10px",
			borderRadius: "5px",
			border: "1px solid #ccc",
			marginTop: "10px",
			resize: "vertical" as "vertical",
		},
		count: {
			fontSize: "12px",
			color: "#909090",
			textAlign: "right" as "right",
		},
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<div style={profileCard.container} className="py-6">
				<div style={sidebar.container}>
					<h2 style={sidebar.title}>Settings</h2>
					<div style={sidebar.card}>
						<ul>
							<li style={sidebar.current}>
								<a href="#" style={sidebar.navLink}>
									<span style={sidebar.icon}>👤</span>
									Profile
								</a>
							</li>
							<li style={hoverText(0)} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={handleMouseLeave}>
								<a href="#" style={sidebar.navLink}>
									<span style={sidebar.icon}>🔔</span>
									Notifications
								</a>
							</li>
							<li style={hoverText(1)} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
								<a href="#" style={sidebar.navLink}>
									<span style={sidebar.icon}>❓</span>
									Help
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div style={profileCard.layout}>
					<div style={profileCard.container}>
						<div style={sidebar.container}>
							<h2 style={sidebar.title}>Personal Information</h2>
							<div style={profileCard.card}>
								<form onSubmit={savePersonalInformation}>
									<div style={profileCard.profileImage}>
										<Image
											src={preview ? preview : image ? image : "/images/Blank Profile Photo.jpg"}
											alt="Profile Picture"
											width={100}
											height={100}
											className="rounded-full mr-2"
											style={{
												width: "100px",
												height: "100px",
											}}
										/>
										<input
											type="file"
											id="fileInput"
											style={{ display: "none" }}
											onChange={handlePhotoChange}
											accept=".png, .jpg, .jpeg, .gif"
										/>
										<button
											type="button"
											style={profileCard.editIcon}
											onClick={() => document.getElementById("fileInput")?.click()}
										>
											✏️
										</button>
									</div>
									<h2 style={profileCard.tutorName}>{name}</h2>
									<div className="space-y-2">
										<div className="space-y-1">
											<Label htmlFor="email">Email (Cannot be changed)</Label>
											<Input type="email" name="email" value={email} readOnly />
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div className="col-span-1 space-y-1">
												<Label htmlFor="contactNumber">Contact Number</Label>
												<Input
													type="contactNumber"
													name="contactNumber"
													value={contactNumber}
													onChange={(e) => setContactNumber(e.target.value)}
													required
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
																	"w-full justify-start text-left font-normal",
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
															<SelectValue placeholder={gender} />
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
															<SelectValue placeholder={nationality} />
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
															<SelectValue placeholder={race} />
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
									</div>
									<div style={profileCard.buttonContainer}>
										<button type="button" style={profileCard.resetPasswordButton} onClick={handleResetPassword}>
											Reset Password
										</button>
										<button type="submit" style={profileCard.saveButton}>
											Save Changes
										</button>
									</div>
									{error1 && <p style={{ color: "red" }}>{error1}</p>}
								</form>
							</div>
						</div>
					</div>
					<div style={profileCard.container}>
						<div style={sidebar.container}>
							<h2 style={sidebar.title}>Tutor Preferences & Experience</h2>
							<form onSubmit={saveTutorPreferences}>
								<div style={profileCard.card}>
									<div className="space-y-3">
										<div className="space-y-1">
											<Label htmlFor="levelsAndSubjects" style={{ fontSize: "20px" }}>
												Levels and Subjects
											</Label>
											{Object.entries(subjectsByCategory).map(([category, subjects]) => (
												<div
													key={category}
													style={{
														marginTop: "10px",
													}}
												>
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
																checked={location.includes(loc[0])}
															/>
															{loc[0]}
															<span style={locationStyle.places}>{loc[1]}</span>
														</label>
													</div>
												))}
											</div>
										</div>
										<div className="space-y-1">
											<Label htmlFor="experiences" style={{ fontSize: "20px" }}>
												Experiences
											</Label>
											<div className="space-y-1">
												<Label htmlFor="yearsOfExperience" style={questionStyle.title}>
													Short introduction of yourself
												</Label>
												<span style={questionStyle.subtitle}>Personal Qualities, Teaching Style etc.</span>
												<textarea
													value={introduction}
													onChange={(e) => handleTextChange(e, setIntroduction)}
													style={questionStyle.inputArea}
													placeholder={introduction ? introduction : `Enter your introduction (maximum ${maxWords} words)`}
													rows={5}
												/>
												<div style={questionStyle.count}>
													{!introduction || introduction.trim() === "" ? 0 : introduction.trim().split(/\s+/).length}/
													{maxWords} words
												</div>
											</div>
											<div className="space-y-1">
												<Label htmlFor="summary" style={questionStyle.title}>
													Summary of Teaching Experiences and Academic Achievements
												</Label>
												<span style={questionStyle.subtitle}>
													Schools or number of students taught, grades achieved by students etc.
													<br />
													Academic results, awards, scholarships etc.
												</span>
												<textarea
													value={summary}
													onChange={(e) => handleTextChange(e, setSummary)}
													style={questionStyle.inputArea}
													placeholder={
														summary ? summary : `Enter your experiences and achievements (maximum ${maxWords} words)`
													}
													rows={5}
												/>
												<div style={questionStyle.count}>
													{!summary || summary.trim() === "" ? 0 : summary.trim().split(/\s+/).length}/{maxWords} words
												</div>
											</div>
											<div className="space-y-1">
												<Label htmlFor="studentsRecord" style={questionStyle.title}>
													Past Students&apos; Results
												</Label>
												<span style={questionStyle.subtitle}>Past students&apos; results, grades, improvements etc.</span>
												<textarea
													value={studentsResults}
													onChange={(e) => handleTextChange(e, setStudentsResults)}
													style={questionStyle.inputArea}
													placeholder={
														studentsResults
															? studentsResults
															: `Enter your past students' results (maximum ${maxWords} words)`
													}
													rows={5}
												/>
												<div style={questionStyle.count}>
													{!studentsResults || studentsResults.trim() === ""
														? 0
														: studentsResults.trim().split(/\s+/).length}
													/{maxWords} words
												</div>
											</div>
										</div>
									</div>
									<div style={profileCard.buttonContainer}>
										<button type="submit" style={profileCard.buttonFull}>
											Save Changes
										</button>
									</div>
									{error2 && <p style={{ color: "red" }}>{error2}</p>}
								</div>
							</form>
						</div>
					</div>
					<div style={profileCard.container}>
						<div style={sidebar.container}>
							<h2 style={sidebar.title}>Academic Qualifications</h2>
							<form onSubmit={savecademicQualificationsChanges}>
								<div style={profileCard.card}>
									<div className="space-y-2">
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
														<SelectValue placeholder={typeOfTutor} />
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
											<Select
												required
												value={highestEducationLevel}
												onValueChange={(value: string) => setHighestEducationLevel(value)}
											>
												<div>
													<SelectTrigger className="w-full">
														<SelectValue placeholder={highestEducationLevel} />
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
									</div>
									<div style={profileCard.buttonContainer}>
										<button type="submit" style={profileCard.buttonFull}>
											Save Changes
										</button>
									</div>
									{error3 && <p style={{ color: "red" }}>{error3}</p>}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

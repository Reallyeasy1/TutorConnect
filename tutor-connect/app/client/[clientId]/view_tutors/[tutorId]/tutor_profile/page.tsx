"use client";

import Footer from "@/components/footer/footer";
import NavBar from "@/components/nav-bar/navBar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import StarRating from "@/components/ui/StarRating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/customTabs";

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
	location: string[];
	summary: string;
	studentsResults: string;
};

type CheckedSubjects = {
	"Pre-School": string[];
	"Primary School": string[];
	"Secondary School": string[];
	"Junior College": string[];
	"IB/IGCSE": string[];
	"Diploma/Degree": string[];
};

type Review = {
	id: number;
	tutorId: number;
	clientId: number;
	rating: number;
	review: string;
	createdAt: string;
};
// TODO: Fetch rating from database
export default function TutorProfile() {
	const params = useParams();
	const tutorId = params.tutorId;
	const [profile, setProfile] = useState<Tutor | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);

	useEffect(() => {
		const fetchTutorDetails = async () => {
			try {
				const res = await fetch("/api/tutor/getTutorDetails", {
					method: "POST",
					body: JSON.stringify({
						tutorId: tutorId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (res.ok) {
					const tutorData = await res.json();
					setProfile(tutorData);
				} else {
					console.error("Failed to fetch tutor details");
				}

				const reviews = await fetch("/api/tutor/getReviews", {
					method: "POST",
					body: JSON.stringify({
						tutorId: tutorId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (reviews.ok) {
					const reviewsData = await reviews.json();
					setReviews(reviewsData.reviews)
				} else {
					console.error("Failed to fetch reviews");
				}
			} catch (error) {
				console.error("Error fetching tutor details:", error);
			}
		};
		fetchTutorDetails();
	}, [tutorId]);

	const styles = {
		sectionContainer: {
			display: "grid",
			gridTemplateColumns: "1fr 2fr 2fr",
			width: "80%",
			margin: "0 auto",
			padding: "30px",
		},
		leftSide: {
			gridColumn: "1 / 2",
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "flex-start",
			alignItems: "flex-start",
			padding: "30px 30px 0 0",
			borderRight: "1px solid #ddd",
		},
		rightSide: {
			gridColumn: "2 / 4",
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "flex-start",
			padding: "30px 30px 0 30px",
		},
		profileImage: {
			width: "320px",
			height: "320px",
			borderRadius: "50%",
			backgroundColor: "#fff",
			position: "relative" as "relative",
			margin: "0 auto",
			marginBottom: "20px",
			border: "1px solid #ddd",
		},
		leftTextSection: {
			padding: "30px 0",
			alignText: "left",
		},
		leftHeader: {
			fontSize: "24px",
			fontWeight: "bold" as "bold",
			font: "Poppins",
			marginBottom: "8px",
		},
		leftText: {
			fontSize: "18px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			marginBottom: "8px",
		},
		tutorDetailsSection: {
			width: "100%",
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "flex-start",
			alignItems: "flex-start",
			marginBottom: "20px",
		},
		name: {
			fontSize: "40px",
			fontWeight: "bold" as "bold",
			font: "Poppins",
			marginBottom: "15px",
		},
		info: {
			fontSize: "24px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#909090",
			marginBottom: "15px",
		},
		detailItem: {
			fontSize: "24px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#000",
			marginBottom: "15px",
		},
		detailHeader: {
			fontSize: "26px",
			fontWeight: "bold" as "bold",
			font: "Poppins",
			color: "#000",
			marginBottom: "12px",
		},
		detailText: {
			fontSize: "18px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#000",
			marginBottom: "35px",
			textAlign: "justify" as "justify",
		},
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<NavBar />
			{profile && (
				<div style={styles.sectionContainer}>
					<div style={styles.leftSide}>
						<div style={styles.profileImage}>
							<Image
								src={
									profile.image
										? profile.image
										: "/images/Blank Profile Photo.jpg"
								}
								alt="Profile Picture"
								width={320}
								height={320}
								quality={100}
								className="rounded-full mr-2"
								style={{
									width: "320px",
									height: "320px",
								}}
							/>
						</div>
						<div style={styles.leftTextSection}>
							<h2 style={styles.leftHeader}>
								Levels And Subjects Taught
							</h2>
							{Object.entries(profile.levelAndSubjects).map(
								([key, value]) => {
									if (value.length > 0) {
										return (
											<div
												key={key}
												style={styles.leftText}
											>
												<strong>{key}:</strong>{" "}
												{value.join(", ")}
											</div>
										);
									}
									return null;
								}
							)}
						</div>
						<div style={styles.leftTextSection}>
							<h2 style={styles.leftHeader}>
								Preferred Locations
							</h2>
							<p style={styles.leftText}>
								{Object.entries(profile.location).map(
									(place, index) => {
										return (
											<>
												{place[1]}
												{index <
													profile.location.length -
														1 && ", "}
											</>
										);
									}
								)}
							</p>
						</div>
					</div>
					<div style={styles.rightSide}>
						<div style={styles.tutorDetailsSection}>
							<h1 style={styles.name}>{profile.name}</h1>
							<p style={styles.info}>
								{profile.typeOfTutor}, {profile.gender},{" "}
								{profile.race}
							</p>
							<div style={{ marginBottom: "15px " }}>
								<StarRating rating={3.2} />
							</div>
							<p style={styles.detailItem}>
								<strong>Years of Experience: </strong>
								{profile.yearsOfExperience}
							</p>
							<p style={styles.detailItem}>
								<strong>Highest Qualification: </strong>
								{profile.highestEducationLevel}
							</p>
						</div>
						<div>
							<Tabs defaultValue="about">
								<TabsList
									className="grid w-full grid-cols-2"
									style={{ marginBottom: "20px", backgroundColor: "#eff8fa", color: "#5790AB" }}
								>
									<TabsTrigger
										value="about"
										className="font-xl"
									>
										About
									</TabsTrigger>
									<TabsTrigger value="reviews">
										Reviews
									</TabsTrigger>
								</TabsList>
								<TabsContent value="about">
									<h2 style={styles.detailHeader}>
										About Me
									</h2>
									<p style={styles.detailText}>
										{profile.introduction
											? profile.introduction
											: "Tutor has yet to update"}
									</p>
									<h2 style={styles.detailHeader}>
										Teaching Experience & Academic
										Achievements
									</h2>
									<p style={styles.detailText}>
										{profile.summary
											? profile.summary
											: "Tutor has yet to update"}
									</p>
									<h2 style={styles.detailHeader}>
										Past Students&apos; Results
									</h2>
									<p style={styles.detailText}>
										{profile.studentsResults
											? profile.studentsResults
											: "Tutor has yet to update"}
									</p>
								</TabsContent>
								<TabsContent value="reviews">
									{reviews.map((review) => (
										<div key={review.id}>
											<StarRating rating={review.rating} />
											<p>{review.review}</p>
										</div>
									))}
									</TabsContent>
							</Tabs>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
}

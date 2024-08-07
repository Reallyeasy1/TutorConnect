"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import StarRating from "@/components/ui/StarRating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/customTabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Client } from "@prisma/client";
import Nothing from "@/components/ui/Nothing";

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
	client: Client;
};

type ProfileProps = {
	tutor: Tutor;
	reviews: Review[];
    averageRating: number;
};

export const Profile: React.FC<ProfileProps> = ({ tutor, reviews, averageRating }) => {
	const [sortedReviews, setSortedReviews] = useState<Review[]>(reviews);
	const [sortBy, setSortBy] = useState<"highest" | "lowest" | "newest">("newest");
	const [page, setPage] = useState(1);
	const totalPages = Math.ceil(reviews.length / 5)
	const limit = 5;
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(limit);

	useEffect(() => {
		let sorted;
		if (sortBy === "highest") {
			sorted = [...reviews].sort((a, b) => b.rating - a.rating);
		} else if (sortBy === "lowest") {
			sorted = [...reviews].sort((a, b) => a.rating - b.rating);
		} else if (sortBy === "newest") {
			sorted = [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		}
		if (sorted) {
			setSortedReviews(sorted);
		}
	}, [sortBy, reviews]);

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(page - 1);
			setStartIndex(startIndex - limit);
			setEndIndex(endIndex - limit);
		}
	};

	const handleNextPage = () => {
		if (page < totalPages) {
			setPage(page + 1);
			setStartIndex(startIndex + limit);
			setEndIndex(endIndex + limit);
		}
	};

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
            lineHeight: "1.5",
		},
		tutorDetailsSection: {
			width: "100%",
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "flex-start",
			alignItems: "flex-start",
			marginBottom: "15px",
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
            lineHeight: "1.5",
		},
		reviewContainer: {
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "flex-start",
			alignItems: "flex-start",
			marginBottom: "20px",
			borderTop: "1px solid #ddd",
		},
		reviewSection: {
			display: "grid",
			gridTemplateColumns: "1fr 6fr",
			gap: "10px",
			padding: "20px",
		},
		imageSection: {
			width: "90px",
			display: "flex",
			justifyContent: "center",
			alignItems: "flex-start",
		},
		image: {
			width: "70px",
			height: "70px",
			borderRadius: "50%",
			border: "1px solid #ddd",
		},
		profileName: {
			fontSize: "24px",
			fontWeight: "bold" as "bold",
			font: "Poppins",
			marginTop: "2px",
		},
		posted: {
			fontSize: "16px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#909090",
			marginBottom: "10px",
		},
		text: {
			fontSize: "16px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#000",
			marginTop: "10px",
			textAlign: "justify" as "justify",
            lineHeight: "1.5",
		},
		sortSection: {
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "center",
			padding: "10px 20px 20px 20px",
		},
		sortText: {
			fontSize: "20px",
			fontWeight: "bold" as "bold",
			font: "Poppins",
			marginRight: "20px",
		},
		activeButton: {
			backgroundColor: "#5790AB",
			color: "#fff",
			padding: "10px 20px",
			borderRadius: "5px",
			marginRight: "10px",
			cursor: "pointer",
			fontSize: "16px",
			fontWeight: "bold",
		},
		inactiveButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			padding: "10px 20px",
			borderRadius: "5px",
			marginRight: "10px",
			border: "1px solid #5790AB",
			fontSize: "16px",
			fontWeight: "bold",
		},
	};

	return (
		<div style={styles.sectionContainer}>
			<div style={styles.leftSide}>
				<div style={styles.profileImage}>
					<Image
						src={tutor.image ? tutor.image : "/images/Blank Profile Photo.jpg"}
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
					<h2 style={styles.leftHeader}>Levels And Subjects Taught</h2>
					{Object.entries(tutor.levelAndSubjects).map(([key, value]) => {
						if (value.length > 0) {
							return (
								<div key={key} style={styles.leftText}>
									<strong>{key}:</strong> {value.join(", ")}
								</div>
							);
						}
						return null;
					})}
				</div>
				<div style={styles.leftTextSection}>
					<h2 style={styles.leftHeader}>Preferred Locations</h2>
					<p style={styles.leftText}>
						{Object.entries(tutor.location).map((place, index) => {
							return (
								<>
									{place[1]}
									{index < tutor.location.length - 1 && ", "}
								</>
							);
						})}
					</p>
				</div>
			</div>
			<div style={styles.rightSide}>
				<div style={styles.tutorDetailsSection}>
					<h1 style={styles.name}>{tutor.name}</h1>
					<p style={styles.info}>
						{tutor.typeOfTutor}, {tutor.gender}, {tutor.race}
					</p>
					<div style={{ marginBottom: "15px " }}>
						<StarRating rating={averageRating} />
					</div>
					<p style={styles.detailItem}>
						<strong>Years of Experience: </strong>
						{tutor.yearsOfExperience}
					</p>
					<p style={styles.detailItem}>
						<strong>Highest Qualification: </strong>
						{tutor.highestEducationLevel}
					</p>
				</div>
				<div>
					<Tabs defaultValue="about">
						<TabsList className="grid w-full grid-cols-2" style={{ marginBottom: "20px", backgroundColor: "#eff8fa", color: "#5790AB" }}>
							<TabsTrigger value="about" className="font-xl">
								About
							</TabsTrigger>
							<TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
						</TabsList>
						<TabsContent value="about">
							<h2 style={styles.detailHeader}>About Me</h2>
							<p style={styles.detailText}>{tutor.introduction ? tutor.introduction : "Tutor has yet to update"}</p>
							<h2 style={styles.detailHeader}>Teaching Experience & Academic Achievements</h2>
							<p style={styles.detailText}>{tutor.summary ? tutor.summary : "Tutor has yet to update"}</p>
							<h2 style={styles.detailHeader}>Past Students&apos; Results</h2>
							<p style={styles.detailText}>{tutor.studentsResults ? tutor.studentsResults : "Tutor has yet to update"}</p>
						</TabsContent>
						<TabsContent value="reviews">
							<div style={styles.sortSection}>
								<div style={styles.sortText}>Sort by: </div>
								<Button style={sortBy == "newest" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("newest")}>
									Newest
								</Button>
								<Button
									style={sortBy == "highest" ? styles.activeButton : styles.inactiveButton}
									onClick={() => setSortBy("highest")}
								>
									Highest
								</Button>
								<Button style={sortBy == "lowest" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("lowest")}>
									Lowest
								</Button>
							</div>
							{sortedReviews.length === 0 && (
								<Nothing message={"No reviews yet."} imageSrc={"/images/Review.png"} imageAlt={"Review"} />
							)}
							{sortedReviews.slice(startIndex, endIndex).map((review) => (
								<div style={styles.reviewContainer} key={review.id}>
									<div key={review.id} style={styles.reviewSection}>
										<div style={styles.imageSection}>
											<Image
												src={review.client.image ? review.client.image : "/images/Blank Profile Photo.jpg"}
												alt="Profile Picture"
												width={70}
												height={70}
												quality={100}
												style={styles.image}
											/>
										</div>
										<div>
											<h2 style={styles.profileName}>{review.client.name}</h2>
											<p style={styles.posted}>Posted on: {new Date(review.createdAt).toLocaleDateString("en-GB")}</p>
											<StarRating rating={review.rating} starSize="24px" />
											<p style={styles.text}>{review.review}</p>
										</div>
									</div>
								</div>
							))}
							<Pagination style={{ padding: "10px", fontSize: "16px" }}>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious onClick={handlePreviousPage} />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink>{page}</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationNext onClick={handleNextPage} />
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

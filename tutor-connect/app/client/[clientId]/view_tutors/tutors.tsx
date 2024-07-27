"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { ReviewForm } from "./form";
import { Filter } from "./filter";
import { RequestForm } from "./request";
import Nothing from "@/components/ui/Nothing";
import { Client, Review } from "@prisma/client";
import SmallStarRating from "@/components/ui/SmallStarRating";

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
	reviews: Review[];
};

type CheckedSubjects = {
	"Pre-School": string[];
	"Primary School": string[];
	"Secondary School": string[];
	"Junior College": string[];
	"IB/IGCSE": string[];
	"Diploma/Degree": string[];
};

type AllTutorsProps = {
    allTutors: Tutor[];
    client: Client;
}

export const AllTutors: React.FC<AllTutorsProps> = ({ allTutors, client }) => {
    const [tutors, setTutors] = useState<Tutor[]>(allTutors);
	const [filteredTutors, setFilteredTutors] = useState<Tutor[]>(allTutors);
	const [page, setPage] = useState(1);
	const totalPages = Math.ceil(tutors.length / 8);
	const limit = 8;
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(limit);
	const router = useRouter();

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

	const viewProfile = (id: number) => {
		router.push(`/client/${client.id}/view_tutors/${id}/tutor_profile`);
	};

	const styles = {
		tutorContainer: {
			display: "grid",
			gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
			gap: "10px",
			padding: "10px",
		},
		tutorCard: {
			border: "1px solid lightgray",
			borderRadius: "10px",
			padding: "20px",
			backgroundColor: "white",
			textAlign: "center" as "center",
			width: "1200px",
		},
		tutorInfo: {
			display: "flex",
			flexDirection: "row" as "row",
		},
		tutorImage: {
			width: "200px",
			height: "200px",
			borderRadius: "50%",
		},
		tutorName: {
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "24px",
			textAlign: "left" as "left",
		},
		tutorSummary: {
			font: "Poppins",
			fontSize: "16px",
			textAlign: "left" as "left",
			color: "#909090",
			fontStyle: "italic",
		},
		pagination: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			marginTop: "20px",
		},
		detailsSection: {
			justifyContent: "space-between",
			marginTop: "10px",
			textAlign: "justify" as "justify",
			marginRight: "4px",
		},
		detailItem: {
			display: "block",
			marginBottom: "8px",
			font: "Poppins",
			fontSize: "16px",
			fontWeight: "bold",
		},
		buttonSection: {
			display: "grid",
			gridTemplateColumns: "repeat(3, 1fr)",
			gap: "8px",
		},
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
		whiteButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "100%",
			border: "1px solid #5790AB",
			gridColumn: "span 1",
			marginTop: "10px",
		},
		emptySection: {
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "20px",
			width: "100%",
		},
		none: {
			fontSize: "24px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#909090",
			padding: "20px",
		},
	};

	return (
		<>
			<div className="flex-grow flex flex-col justify-center items-center py-6">
				<Filter tutors={tutors} setFilteredTutors={setFilteredTutors} />
			</div>
			{filteredTutors.length === 0 && <Nothing message={"No tutors found"} imageSrc={"/images/teacher.png"} imageAlt={"tutor"} />}
			<div className="flex-grow flex flex-col justify-center items-center">
				<div style={styles.tutorContainer}>
					{filteredTutors.slice(startIndex, endIndex).map((tutor: Tutor) => (
						<div key={tutor.id} style={styles.tutorCard}>
							<div style={styles.tutorInfo}>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										minWidth: "200px",
									}}
								>
									<Image
										src={tutor.image ? tutor.image : "/images/Blank Profile Photo.jpg"}
										alt={tutor.name}
										width={200}
										height={200}
										style={styles.tutorImage}
									/>
								</div>
								<div style={{ marginLeft: "20px" }}>
									<h2 style={styles.tutorName}>{tutor.name}</h2>
									<p style={styles.tutorSummary}>
										{tutor.typeOfTutor}, {tutor.gender}, {tutor.race}
									</p>
									<div style={{ marginTop: "10px" }}>
										<SmallStarRating
											rating={
												tutor.reviews.length > 0
													? tutor.reviews.reduce((sum, review) => sum + review.rating, 0) / tutor.reviews.length
													: 0
											}
											starSize="24px"
										/>
									</div>
									<div style={styles.detailsSection}>
										<p style={styles.detailItem}>
											Years of Experience: <span className="font-normal">{tutor.yearsOfExperience} years</span>
										</p>
										<p style={styles.detailItem}>
											Highest Qualification: <span className="font-normal">{tutor.highestEducationLevel}</span>
										</p>
										{tutor.introduction && (
											<p style={styles.detailItem}>
												About Me: <span className="font-normal">{tutor.introduction}</span>
											</p>
										)}
									</div>
								</div>
							</div>
							<div style={styles.buttonSection}>
								<Button style={styles.blueButton} onClick={() => viewProfile(tutor.id)}>
									View Profile
								</Button>
								<ReviewForm tutor={tutor} clientName={client.name} clientImage={client.image ?? ""} />
								<RequestForm client={client} tutor={tutor} />
							</div>
						</div>
					))}
				</div>
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
			</div>
		</>
	);
};

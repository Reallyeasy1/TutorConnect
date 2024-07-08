"use client";

import NavBar from "@/components/nav-bar/navBar";
import React, { useEffect, useState } from "react";
import Footer from "@/components/footer/footer";
import FilterSection from "./filter";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

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

export default function ViewTutorsPage() {
	const [tutors, setTutors] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 8;
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(limit);

	useEffect(() => {
		const fetchTutors = async () => {
			try {
				const response = await fetch(
					`/api/tutor/allTutors?page=${page}&limit=${limit}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const data = await response.json();
				setTutors(data.tutors);
				setTotalPages(data.totalPages);
			} catch (error) {
				console.error("Error fetching tutors:", error);
			}
		};

		fetchTutors();
	}, [page, limit]);

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
		headerTitle: {
			fontWeight: "bold",
			fontSize: "30px",
			font: "Poppins",
			color: "#000",
			padding: "10px 0 20px 0",
		},
		tutorContainer: {
			display: "grid",
			gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
			gap: "20px",
			padding: "20px",
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
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<NavBar />
			<div className="flex-grow flex flex-col justify-center items-center py-6">
				<h1 style={styles.headerTitle}>View Tutors</h1>
				<FilterSection />
			</div>
			<div className="flex-grow flex flex-col justify-center items-center">
				<div style={styles.tutorContainer}>
					{tutors.slice(startIndex, endIndex).map((tutor: Tutor) => (
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
										src={
											tutor.image
												? tutor.image
												: "/images/Blank Profile Photo.jpg"
										}
										alt={tutor.name}
										width={200}
										height={200}
										style={styles.tutorImage}
									/>
								</div>
								<div style={{ marginLeft: "20px" }}>
									<h2 style={styles.tutorName}>
										{tutor.name}
									</h2>
									<p style={styles.tutorSummary}>
										{tutor.typeOfTutor}, {tutor.gender},{" "}
										{tutor.race}
									</p>
									<div style={styles.detailsSection}>
										<p style={styles.detailItem}>
											Years of Experience:{" "}
											<span className="font-normal">
												{tutor.yearsOfExperience} years
											</span>
										</p>
										<p style={styles.detailItem}>
											Highest Qualification:{" "}
											<span className="font-normal">
												{tutor.highestEducationLevel}
											</span>
										</p>
										{tutor.introduction && (
											<p style={styles.detailItem}>
												About Me:{" "}
												<span className="font-normal">
													{tutor.introduction}
												</span>
											</p>
										)}
									</div>
								</div>
							</div>
							<div style={styles.buttonSection}>
								<Button style={styles.blueButton}>
									View Profile
								</Button>
								<Button style={styles.whiteButton}>
									Submit Review
								</Button>
								<Button style={styles.blueButton}>
									Make a Request
								</Button>
							</div>
						</div>
					))}
				</div>
				<Pagination style={{ padding: "10px", fontSize: "16px" }}>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={handlePreviousPage}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink>{page}</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext
								onClick={handleNextPage}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
			<Footer />
		</div>
	);
}

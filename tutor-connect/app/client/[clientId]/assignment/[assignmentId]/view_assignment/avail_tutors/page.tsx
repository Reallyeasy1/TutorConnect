"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Footer from "@/components/footer/footer";
import * as React from "react";
import { OfferForm } from "./offer";
import Image from "next/image";
import Nothing from "@/components/ui/Nothing";
import { Review } from "@prisma/client";
import SmallStarRating from "@/components/ui/SmallStarRating";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import Loading from "@/app/loading";

interface Tutor {
	id: number;
	email: string;
	password: string;
	name: string;
	contactNumber: number;
	dateOfBirth: string;
	gender: string;
	age: number;
	nationality: string;
	race: string;
	typeOfTutor: string;
	yearsOfExperience: number;
	highestEducationLevel: string;
	location: string;
	image: string;
	reviews: Review[];
	introduction: string;
}

export default function AvailTutors() {
	const router = useRouter();
	const params = useParams();
	const assignmentId = params.assignmentId;
	const clientId = params.clientId;
	const [tutors, setTutors] = useState<Tutor[]>([]);
	const [sortedTutors, setSortedTutors] = useState<Tutor[]>([]);
	const [error, setError] = useState<string | null>(null);
	const limit = 8;
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(limit);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState<"highest" | "lowest">("highest");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const tutorsResponse = await fetch(`/api/client/avail_tutors/${assignmentId}`);
				if (!tutorsResponse.ok) {
					throw new Error("Failed to fetch tutors");
				}
				const tutorsData = await tutorsResponse.json();
				setTutors(tutorsData.avail_tutors);
				setSortedTutors(tutorsData.avail_tutors);
				setTotalPages(Math.ceil(tutorsData.avail_tutors.length / limit));
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [assignmentId]);

	useEffect(() => {
		let sorted;
		if (sortBy === "highest") {
			sorted = [...tutors].sort((a, b) => averageRating(b.reviews) - averageRating(a.reviews));
		} else if (sortBy === "lowest") {
			sorted = [...tutors].sort((a, b) => averageRating(a.reviews) - averageRating(b.reviews));
		}
		if (sorted) {
			setSortedTutors(sorted);
		}
	}, [sortBy, tutors]);

	function averageRating(reviews: Review[]) {
		if (reviews.length === 0) {
			return 0;
		}
		return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
	}

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
		router.push(`/client/${clientId}/view_tutors/${id}/tutor_profile`);
	};

	const filteredTutors = sortedTutors.filter((tut) => tut.name.toLowerCase().includes(search.toLowerCase()));

	const styles = {
		tutorInfo: {
			display: "flex",
			flexDirection: "row" as "row",
		},
		tutorImage: {
			width: "200px",
			height: "200px",
			borderRadius: "50%",
			border: "1px solid #ddd",
		},
		detailItem: {
			display: "block",
			marginBottom: "8px",
			font: "Poppins",
			fontSize: "16px",
			fontWeight: "bold",
			textAlign: "justify" as "justify",
		},
		blueButton: {
			backgroundColor: "#5790AB",
			color: "#fff",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
		},
		searchbar: {
			width: "20%",
			marginLeft: "auto",
		},
		sortSection: {
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "center",
			padding: "10px 20px 20px 20px",
			width: "100%",
			borderBottom: "1px solid #5790AB",
		},
		sortText: {
			fontSize: "20px",
			fontWeight: "bold" as "bold",
			font: "Poppins",
			marginRight: "20px",
			alignItems: "center",
			display: "flex",
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
		container: {
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "20px",
			width: "75%",
		},
		main: {
			display: "flex",
			justifyContent: "center",
			alignItems: "flex-start",
			flex: "1",
			border: "1px solid #5790AB",
		},
		imageSection: {
			display: "flex",
			borderColor: "#5790AB",
			borderWidth: "0 1px 1px 0",
			borderStyle: "solid",
			padding: "20px 15px 20px 15px",
			alignItems: "center",
			justifyContent: "center",
		},
		detailSection: {
			padding: "20px 15px 20px 25px",
			display: "flex",
			flexDirection: "column" as "column",
			borderColor: "#5790AB",
			borderWidth: "0 0 1px 0",
			borderStyle: "solid",
		},
		detailHeader: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		buttons: {
			marginLeft: "auto",
			gap: "10px",
		},
		profileName: {
			fontSize: "24px",
			fontWeight: "bold" as "bold",
			font: "Poppins",
			marginTop: "2px",
		},
		tutorText: {
			fontSize: "16px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#909090",
			marginBottom: "10px",
		},
		detailContainer: {
			display: "grid",
			gridTemplateColumns: "2fr 6fr",
			width: "100%",
		},
		title: {
			fontSize: "32px",
			textAlign: "center" as "center",
			fontWeight: "bold",
			padding: "20px",
		},
	};

	return (
		<div className="flex flex-col min-h-screen" style={{ backgroundColor: "#fff" }}>
			<div style={styles.main}>
				<div style={styles.container}>
					<h1 style={styles.title}>Available Tutors</h1>
					<div style={styles.sortSection}>
						<div style={styles.sortText}>Sort by:</div>
						<Button style={sortBy == "highest" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("highest")}>
							Highest
						</Button>
						<Button style={sortBy == "lowest" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("lowest")}>
							Lowest
						</Button>
						<Input
							placeholder="Search by name"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							type="search"
							style={styles.searchbar}
						/>
					</div>
					{loading && <Loading />}
					{!loading && filteredTutors.length === 0 ? (
						<Nothing message={"No available tutors"} imageSrc={"/images/teacher.png"} imageAlt={"tutor"} />
					) : (
						<>
							{filteredTutors.slice(startIndex, endIndex).map((tutor: Tutor) => (
								<div style={styles.detailContainer} key={tutor.id}>
									<div style={styles.imageSection}>
										<Image
											src={tutor.image ? tutor.image : "/images/Blank Profile Photo.jpg"}
											alt={tutor.name}
											width={180}
											height={180}
											style={styles.tutorImage}
										/>
									</div>
									<div style={styles.detailSection}>
										<div style={styles.detailHeader}>
											<div>
												<h2 style={styles.profileName}>{tutor.name}</h2>
											</div>
											<div style={styles.buttons}>
												<Button style={styles.blueButton} onClick={() => viewProfile(tutor.id)}>
													View Profile
												</Button>
												<OfferForm tutor={tutor} assignmentId={assignmentId} clientId={clientId} />
											</div>
										</div>
										<p style={styles.tutorText}>
											{tutor.typeOfTutor}, {tutor.gender}, {tutor.race}
										</p>
										<div style={{ marginBottom: "10px" }}>
											<SmallStarRating rating={averageRating(tutor.reviews)} starSize="24px" />
										</div>
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
						</>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}

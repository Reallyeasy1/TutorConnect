"use client"

import { Client, Tutor } from "@prisma/client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import StarRating from "@/components/ui/StarRating";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { DeletePopup } from "./delete";
import { EditReview } from "./edit";
import Loading from "@/app/loading";
import Nothing from "@/components/ui/Nothing";

type Review = {
	id: number;
	tutorId: number;
	clientId: number;
	rating: number;
	review: string;
	createdAt: string;
	client: Client;
	tutor: Tutor;
};

interface ReviewsProps {
	reviewData: Review[];
}

export const Reviews: FC<ReviewsProps> = ({ reviewData }) => {
    const [reviews, setReviews] = useState<Review[]>(reviewData);
	const [sortedReviews, setSortedReviews] = useState<Review[]>(reviewData);
	const [sortBy, setSortBy] = useState<"highest" | "lowest" | "newest">("newest");
	const [reviewSearch, setReviewSearch] = useState("");
	const [page, setPage] = useState(1);
	const totalPages =Math.ceil(reviewData.length / 5);
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

	const filteredReviews = sortedReviews.filter((review) => review.tutor.name.toLowerCase().includes(reviewSearch.toLowerCase()));

	const styles = {
		title: {
			fontSize: "32px",
			textAlign: "center" as "center",
			fontWeight: "bold",
			padding: "20px",
		},
		container: {
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "20px",
			width: "70%",
		},
		main: {
			display: "flex",
			justifyContent: "center",
			alignItems: "flex-start",
			flex: "1",
			border: "1px solid #5790AB",
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
		searchbar: {
			width: "20%",
			marginLeft: "auto",
		},
		reviewContainer: {
			display: "grid",
			gridTemplateColumns: "2fr 6fr",
			width: "100%",
		},
		tutorImage: {
			width: "200px",
			height: "200px",
			borderRadius: "50%",
			border: "1px solid #ddd",
			alignItems: "center",
		},
		imageSection: {
			display: "flex",
			borderColor: "#5790AB",
			borderWidth: "0 1px 1px 0",
			borderStyle: "solid",
			padding: "20px 15px 20px 15px",
			alignItems: "center",
		},
		reviewSection: {
			padding: "20px 15px 20px 25px",
			display: "flex",
			flexDirection: "column" as "column",
			borderColor: "#5790AB",
			borderWidth: "0 0 1px 0",
			borderStyle: "solid",
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
		},
		reviewHeader: {
			display: "flex",
		},
		buttons: {
			marginLeft: "auto",
		},
	};

    return (
        <div style={styles.main}>
				<div style={styles.container}>
					<h1 style={styles.title}>My Reviews</h1>
					<div style={styles.sortSection}>
						<div style={styles.sortText}>Sort by:</div>
						<Button style={sortBy == "newest" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("newest")}>
							Newest
						</Button>
						<Button style={sortBy == "highest" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("highest")}>
							Highest
						</Button>
						<Button style={sortBy == "lowest" ? styles.activeButton : styles.inactiveButton} onClick={() => setSortBy("lowest")}>
							Lowest
						</Button>
						<Input
							placeholder="Search by name"
							value={reviewSearch}
							onChange={(e) => setReviewSearch(e.target.value)}
							type="search"
							style={styles.searchbar}
						/>
					</div>
					{filteredReviews.length === 0 && (
						<Nothing message={"No reviews yet."} imageSrc={"/images/Review.png"} imageAlt={"Review"} />
					)}
					{filteredReviews.slice(startIndex, endIndex).map((review) => (
						<div style={styles.reviewContainer} key={review.id}>
							<div style={styles.imageSection}>
								<Image
									src={review.tutor.image ? review.tutor.image : "/images/Blank Profile Photo.jpg"}
									alt={review.tutor.name}
									width={180}
									height={180}
									style={styles.tutorImage}
								/>
							</div>
							<div style={styles.reviewSection}>
								<div style={styles.reviewHeader}>
									<div>
										<h2 style={styles.profileName}>{review.tutor.name}</h2>
									</div>
									<div style={styles.buttons}>
										<EditReview review={review} />
										<DeletePopup reviewId={review.id} />
									</div>
								</div>
								<p style={styles.posted}>Posted on: {new Date(review.createdAt).toLocaleDateString("en-GB")}</p>
								<StarRating rating={review.rating} starSize="24px" />
								<p style={styles.text}>{review.review}</p>
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
				</div>
			</div>
    )
}
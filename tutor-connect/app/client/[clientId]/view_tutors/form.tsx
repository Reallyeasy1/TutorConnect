"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StarFeedback from "@/components/ui/StarFeedback";
import { Textarea } from "@/components/ui/textArea";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import Image from "next/image";
import { Alert } from "@/components/ui/alert";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

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

interface ReviewFormProps {
	tutor: Tutor;
	clientName: string;
	clientImage?: string;
}

export const ReviewForm: FC<ReviewFormProps> = ({ tutor, clientName, clientImage }) => {
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [submit, setSubmit] = useState(false);
	const params = useParams();
	const router = useRouter();
	const clientId = params.clientId;

	const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
		const text = event.target.value;
		const words = text.trim().split(/\s+/);
		if (words.length <= 100) {
			setState(text);
		} else {
			setError("Maximum word limit exceeded");
		}
	};

	const handleRate = (rate: number) => {
		setRating(rate);
	};

	const postReview = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmit(true);

		if (clientName === "") {
			setError("You must be logged in to post a review");
			setSubmit(false);
			return;
		}

		if (rating === 0) {
			setError("Rating cannot be empty");
			setSubmit(false);
			return;
		}

		if (!review || review.trim() === "") {
			setError("Review cannot be empty");
			setSubmit(false);
			return;
		}

		try {
			const res = await fetch("/api/client/post_review", {
				method: "POST",
				body: JSON.stringify({
					tutorId: tutor.id,
					clientId: clientId,
					review: review,
					rating: rating,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				alert("Review Posted!");
				router.refresh();
			} else {
				setError((await res.json()).error);
				setSubmit(false);
			}
		} catch (error: any) {
			setError(error?.message);
			setSubmit(false);
		}

		console.log("Review Posted!");
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
		filterSection: {
			border: "1px solid lightgray",
			borderRadius: "10px",
			padding: "20px",
			marginBottom: "20px",
			width: "700px",
		},
		button: {
			backgroundColor: "#5790AB",
			color: "#fff",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "100%",
		},
		filterButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "100%",
			border: "1px solid #5790AB",
		},
		reviewName: {
			color: "#000000",
			fontFamily: "Poppins",
			fontSize: "16px",
			fontWeight: "bold",
		},
		reviewNote: {
			color: "#909090",
			fontFamily: "Poppins",
			fontSize: "14px",
		},
		profilePart: {
			display: "flex",
			flexDirection: "row" as "row",
			justifyContent: "flex-start",
			alignItems: "center",
			marginTop: "15px",
		},
		profileText: {
			display: "flex",
			flexDirection: "column" as "column",
			alignItems: "flex-start",
		},
		stars: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			padding: "10px 0",
		},
		guideSection: {
			display: "flex",
			alignItems: "center",
		},
		guideContainer: {
			width: "100%",
			border: "1px solid #ddd",
			borderRadius: "10px",
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "flex-start",
		},
		guideTitle: {
			font: "Poppins",
			fontSize: "16px",
			fontWeight: "bold",
			color: "#000000",
			textAlign: "left" as "left",
			padding: "20px 15px 10px 15px",
		},
		guideText: {
			font: "Poppins",
			fontSize: "15px",
			fontWeight: "normal",
			color: "#000000",
			textAlign: "justify" as "justify",
			padding: "0px 20px 10px 25px",
			alignItems: "left",
		},
		guideLastText: {
			font: "Poppins",
			fontSize: "15px",
			fontWeight: "normal",
			color: "#000000",
			textAlign: "justify" as "justify",
			padding: "0px 20px 20px 25px",
			alignItems: "left",
		},
		wordCount: {
			fontSize: "12px",
			color: "#909090",
			textAlign: "right" as "right",
			marginTop: "10px",
		},
		title: {
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "24px",
			textAlign: "left" as "left",
		},
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button style={styles.whiteButton}>Submit Review</Button>
			</DialogTrigger>
			<DialogContent className="w-full sm:w-[1400px]">
				<div className="grid grid-cols-3 gap-4">
					<div className="col-span-2 flex space-x-2 flex-col">
						<h1 style={styles.title}>Submit Review for {tutor.name}</h1>
						<div style={styles.profilePart}>
							<Image
								src={clientImage ? clientImage : "/images/Blank Profile Photo.jpg"}
								alt="Profile Picture"
								width={60}
								height={60}
								className="rounded-full mr-2"
								style={{
									width: "60px",
									height: "60px",
									border: "1px solid #ddd",
								}}
							/>
							<div style={styles.profileText} className="items-center">
								<h3 style={styles.reviewName}>{clientName}</h3>
								<span style={styles.reviewNote}>Posting Publicly</span>
							</div>
						</div>
						<div style={styles.stars}>
							<StarFeedback totalStars={5} onRate={handleRate} />
						</div>
						<Textarea
							placeholder="Share your experience with the tutor"
							className="w-full"
							onChange={(e) => handleTextChange(e, setReview)}
						/>
						<div style={styles.wordCount}>
							{!review || review.trim() === "" ? 0 : review.trim().split(/\s+/).length}
							/100 words
						</div>
						{error && <Alert>{error}</Alert>}
						<Button onClick={postReview} style={styles.blueButton} disabled={submit}>
							{submit ? <><Spinner /> Posting Review...</> : "Post Review"}
						</Button>
					</div>
					<div className="col-span-1" style={styles.guideSection}>
						<div style={styles.guideContainer}>
							<h3 style={styles.guideTitle}>What to include in your review:</h3>
							<span style={styles.guideText}>1. Level and subject taught, and grade improvement</span>
							<span style={styles.guideText}>2. Tutor&apos;s teaching style and methods</span>
							<span style={styles.guideLastText}>3. Overall satisfaction</span>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

"use client";

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";

interface ReviewFormProps {
	reviewId: number;
}

export const DeletePopup: FC<ReviewFormProps> = ({ reviewId }) => {
	const [error, setError] = useState<string | null>(null);
	const [submit, setSubmit] = useState(false);
	const router = useRouter();

	const deleteReview = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmit(true);

		try {
			const res = await fetch("/api/client/delete_review", {
				method: "DELETE",
				body: JSON.stringify({
					reviewId: reviewId,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				alert("Review Deleted!");
				router.refresh();
			} else {
				setError((await res.json()).error);
				alert(error);
				setSubmit(false);
			}
		} catch (error: any) {
			setError(error?.message);
			alert(error?.message);
			setSubmit(false);
		}

		console.log("Review Deleted!");
	};

	const styles = {
		header: {
			font: "Poppins",
			fontWeight: "bold",
		},
		text: {
			font: "Poppins",
			fontWeight: "normal",
			color: "#909090",
		},
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive" style={{ font: "Poppins", fontWeight: "bold", fontSize: "16px" }}>
					Delete
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<div>
					<h2 style={styles.header}>Are you sure you want to delete this review?</h2>
					<p style={styles.text}>This action cannot be undone.</p>
				</div>
				<div className="flex justify-between space-x-2">
					<Button onClick={deleteReview} variant="destructive" className="w-full" disabled={submit}>
						{submit ? "Deleting..." : "Delete"}
					</Button>
					<DialogClose asChild>
						<Button variant="outline" className="w-full" disabled={submit}>
							Cancel
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
};

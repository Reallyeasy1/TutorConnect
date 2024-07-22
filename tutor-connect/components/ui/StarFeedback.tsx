import React, { useState } from "react";
import Star from "@/components/ui/Star"; // Adjust the import path as needed

interface StarRatingProps {
	totalStars?: number;
	onRate: (rate: number) => void;
	originalRating?: number;
}

const StarFeedback: React.FC<StarRatingProps> = ({ totalStars = 5, onRate, originalRating }) => {
	const [rating, setRating] = useState(originalRating || 0);

	const handleRating = (rate: number) => {
		setRating(rate);
		onRate(rate);
	};

	return (
		<div style={{ display: "flex" }}>
			{Array.from({ length: totalStars }, (_, index) => (
				<Star key={index} filled={index < rating} onClick={() => handleRating(index + 1)} />
			))}
		</div>
	);
};

export default StarFeedback;

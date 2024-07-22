import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface StarProps {
	filled: boolean;
	onClick: () => void;
}

const Star: React.FC<StarProps> = ({ filled, onClick }) => (
	<span
		onClick={onClick}
		style={{
			cursor: "pointer",
			color: filled ? "#ffc107" : "#e4e5e9", // Gold color for filled stars, light grey for empty
			fontSize: "32px",
		}}
	>
		<FontAwesomeIcon icon={faStar} />
	</span>
);

export default Star;

import React from "react";
import Image from "next/image";

interface NothingProps {
	message: string;
	imageSrc: string;
	imageAlt: string;
}

const Nothing: React.FC<NothingProps> = ({ message, imageSrc, imageAlt }) => {
	const styles = {
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
		<div style={styles.emptySection}>
			<Image
				src={imageSrc}
				alt={imageAlt}
				width={150}
				height={150}
				quality={100}
				style={{
					width: "150px",
					height: "150px",
				}}
			/>
			<p style={styles.none}>{message}</p>
		</div>
	);
};

export default Nothing;
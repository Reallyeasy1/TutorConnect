import React from "react";

const Spinner: React.FC = () => (
	<div
		style={{
			border: "4px solid #f3f3f3",
			borderRadius: "50%",
			borderTop: "4px solid #3498db",
			width: "20px",
			height: "20px",
			animation: "spin 2s linear infinite",
			marginRight: "8px",
		}}
	/>
);

export default Spinner;

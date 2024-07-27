"use client";

import React, { useState } from "react";

export default function SideBar() {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);

	const handleMouseEnter = (index: number) => {
		setHoverIndex(index);
	};

	const handleMouseLeave = () => {
		setHoverIndex(null);
	};

	const hoverText = (index: number) => ({
		backgroundColor: hoverIndex === index ? "#f0f0f0" : "#ffffff",
		borderRadius: "10px",
	});

	const sidebar = {
		container: {
			display: "flex",
			flexDirection: "column" as "column",
			marginRight: "20px",
			padding: "20px",
		},
		card: {
			width: "230px",
			backgroundColor: "#fff",
			borderRadius: "10px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
			fontFamily: "Poppins",
			border: "1px solid #d9d9d9",
		},
		title: {
			fontSize: "24px",
			marginBottom: "10px",
			fontWeight: "bold",
			marginLeft: "8px",
		},
		current: {
			backgroundColor: "#f0f0f0",
			borderRadius: "10px",
		},
		navLink: {
			display: "flex",
			alignItems: "center",
			textDecoration: "none",
			color: "#000",
			fontSize: "16px",
			padding: "10px",
			paddingLeft: "15px",
		},
		icon: {
			marginRight: "10px",
		},
	};

	return (
		<div style={sidebar.container}>
			<h2 style={sidebar.title}>Settings</h2>
			<div style={sidebar.card}>
				<ul>
					<li style={sidebar.current}>
						<a href="#" style={sidebar.navLink}>
							<span style={sidebar.icon}>👤</span>
							Profile
						</a>
					</li>
					<li style={hoverText(0)} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={handleMouseLeave}>
						<a href="#" style={sidebar.navLink}>
							<span style={sidebar.icon}>🔔</span>
							Notifications
						</a>
					</li>
					<li style={hoverText(1)} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
						<a href="#" style={sidebar.navLink}>
							<span style={sidebar.icon}>❓</span>
							Help
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

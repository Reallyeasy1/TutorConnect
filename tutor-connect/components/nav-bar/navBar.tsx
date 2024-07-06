// //TODO: Add Avatar to the profile
// // TODO: For future reference, to update the list of pages to traverse to
// // TODO: Highlight current page
//TODO: Add links/dropdowns to the Nav Bar
//TODO: Add Nav Bar to the respective links
import Logo from "./logo";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "@fontsource/poppins";
import ClientDropdown from "./clientDropdown";
import TutorDropdown from "./tutorDropdown";
import RegisterDropdown from "./registerDropdown";
import LoginDropdown from "./loginDropdown";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import ClientProfile from "./clientProfile";
import TutorProfile from "./tutorProfile";

const NavBar = () => {
	const [clientsDropdown, setClientsDropdown] = useState(false);
	const [tutorsDropdown, setTutorsDropdown] = useState(false);
	const [registerDropdown, setRegisterDropdown] = useState(false);
	const [loginDropdown, setLoginDropdown] = useState(false);
	const [clientProfile, setClientProfile] = useState(false);
	const [tutorProfile, setTutorProfile] = useState(false);
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const clientDropdownRef = useRef<HTMLDivElement>(null);
	const tutorDropdownRef = useRef<HTMLDivElement>(null);
	const registerRef = useRef<HTMLDivElement>(null);
	const loginRef = useRef<HTMLDivElement>(null);
	const clientProfileRef = useRef<HTMLDivElement>(null);
	const tutorProfileRef = useRef<HTMLDivElement>(null);

	const { data: session } = useSession();

	const handleMouseEnter = (index: number) => {
		setHoverIndex(index);
	};

	const handleMouseLeave = () => {
		setHoverIndex(null);
	};

	useEffect(() => {
		let handler = (e: MouseEvent) => {
			if (
				clientDropdownRef.current &&
				!clientDropdownRef.current.contains(e.target as Node)
			) {
				setClientsDropdown(false);
			}
			if (
				tutorDropdownRef.current &&
				!tutorDropdownRef.current.contains(e.target as Node)
			) {
				setTutorsDropdown(false);
			}
			if (
				registerRef.current &&
				!registerRef.current.contains(e.target as Node)
			) {
				setRegisterDropdown(false);
			}
			if (
				loginRef.current &&
				!loginRef.current.contains(e.target as Node)
			) {
				setLoginDropdown(false);
			}
			if (
				clientProfileRef.current &&
				!clientProfileRef.current.contains(e.target as Node)
			) {
				setClientProfile(false);
			}
			if (
				tutorProfileRef.current &&
				!tutorProfileRef.current.contains(e.target as Node)
			) {
				setTutorProfile(false);
			}
		};
		document.addEventListener("mousedown", handler);
	});

	const hoverText = (index: number) => ({
		color: hoverIndex === index ? "#5790AB" : "#000000",
		fontFamily: "Poppins",
		fontSize: 16,
		textDecoration: hoverIndex === index ? "underline" : "none",
	});

	const logoText = {
		color: "#5790AB",
		fontFamily: "Poppins",
		fontSize: 28,
		fontWeight: "bold",
	};
	const navBar = {
		backgroundColor: "#FFFFFF",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
		padding: "16px 48px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		top: 0,
	};

	const registerButton = {
		backgroundColor: "#5790AB",
		color: "#FFFFFF",
		fontSize: 16,
	};

	const profile = {
		name: {
			color: "#000000",
			fontFamily: "Poppins",
			fontSize: 14,
			fontWeight: "bold",
		},
		role: {
			color: "#909090",
			fontFamily: "Poppins",
			fontSize: 14,
		},
		container: {
			display: "flex",
			alignItems: "flex-start",
			justifyContent: "flex-start",
			flexDirection: "column" as "column",
			padding: 2,
		},
	};

	return (
		<nav style={navBar}>
			<div className="flex items-center">
				<Logo />
				<div style={logoText} className="ml-2">
					TutorConnect
				</div>
			</div>
			<div className="flex-1 flex justify-center space-x-8">
				<div>
					<a
						href="/"
						style={hoverText(6)}
						onMouseEnter={() => handleMouseEnter(6)}
						onMouseLeave={handleMouseLeave}
					>
						Home
					</a>
				</div>
				<div className="relative" ref={clientDropdownRef}>
					<button
						style={hoverText(0)}
						onMouseEnter={() => handleMouseEnter(0)}
						onMouseLeave={handleMouseLeave}
						onClick={() => {
							setClientsDropdown(!clientsDropdown);
						}}
						className="flex items-center"
					>
						For Clients
						<Image
							src="/images/arrowdown.png"
							alt="Arrow down"
							width={20}
							height={20}
						/>
					</button>
					{clientsDropdown && <ClientDropdown />}
				</div>
				<div className="relative" ref={tutorDropdownRef}>
					<button
						style={hoverText(1)}
						onMouseEnter={() => handleMouseEnter(1)}
						onMouseLeave={handleMouseLeave}
						onClick={() => {
							setTutorsDropdown(!tutorsDropdown);
						}}
						className="flex items-center"
					>
						For Tutors
						<Image
							src="/images/arrowdown.png"
							alt="Arrow down"
							width={20}
							height={20}
						/>
					</button>
					{tutorsDropdown && <TutorDropdown />}
				</div>
				<div>
					<a
						href="#"
						style={hoverText(2)}
						onMouseEnter={() => handleMouseEnter(2)}
						onMouseLeave={handleMouseLeave}
						onClick={() => {
							setTutorsDropdown(false);
							setClientsDropdown(false);
						}}
					>
						Tuition Rates
					</a>
				</div>
				<div>
					<a
						href="/faq"
						style={hoverText(3)}
						onMouseEnter={() => handleMouseEnter(3)}
						onMouseLeave={handleMouseLeave}
						onClick={() => {
							setTutorsDropdown(false);
							setClientsDropdown(false);
						}}
					>
						FAQ
					</a>
				</div>
				<div>
					<a
						href="#"
						style={hoverText(4)}
						onMouseEnter={() => handleMouseEnter(4)}
						onMouseLeave={handleMouseLeave}
						onClick={() => {
							setTutorsDropdown(false);
							setClientsDropdown(false);
						}}
					>
						Contact Us
					</a>
				</div>
			</div>
			<div className="flex items-center space-x-4">
				{session ? (
					session.user?.randomKey == "client" ? (
						<div
							className="flex items-center space-x-2"
							ref={clientProfileRef}
						>
							<button
								style={hoverText(6)}
								onMouseEnter={() => handleMouseEnter(6)}
								onMouseLeave={handleMouseLeave}
								onClick={() => {
									setClientProfile(!clientProfile);
								}}
								className="flex items-center"
							>
								<Image
									src={
										session.user.image
											? session.user.image
											: "/images/Blank Profile Photo.jpg"
									}
									alt="Profile Picture"
									width={40}
									height={40}
									className="rounded-full mr-2"
								/>
								<div style={profile.container}>
									<span style={profile.name}>
										{session.user.name}
									</span>
									<h3 style={profile.role}>Client</h3>
								</div>
							</button>
							{clientProfile && <ClientProfile />}
						</div>
					) : (
						<div
							className="flex items-center space-x-2"
							ref={tutorProfileRef}
						>
							<button
								style={hoverText(7)}
								onMouseEnter={() => handleMouseEnter(7)}
								onMouseLeave={handleMouseLeave}
								onClick={() => {
									setTutorProfile(!tutorProfile);
								}}
								className="flex items-center"
							>
								<Image
									src="/images/Blank Profile Photo.jpg"
									alt="Profile Picture"
									width={40}
									height={40}
									className="rounded-full  mr-2"
								/>
								<div style={profile.container}>
									<span style={profile.name}>
										{session.user?.name}
									</span>
									<h3 style={profile.role}>Tutor</h3>
								</div>
							</button>
							{tutorProfile && <TutorProfile />}
						</div>
					)
				) : (
					<>
						<div className="relative" ref={loginRef}>
							<button
								className="px-4 py-2 rounded"
								style={{ ...hoverText(5) }}
								onMouseEnter={() => handleMouseEnter(5)}
								onMouseLeave={handleMouseLeave}
								onClick={() => setLoginDropdown(!loginDropdown)}
							>
								Log In
							</button>
							{loginDropdown && <LoginDropdown />}
						</div>
						<div className="relative" ref={registerRef}>
							<button
								className="px-4 py-2 rounded"
								style={{ ...registerButton }}
								onClick={() =>
									setRegisterDropdown(!registerDropdown)
								}
							>
								Register
							</button>
							{registerDropdown && <RegisterDropdown />}
						</div>
					</>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
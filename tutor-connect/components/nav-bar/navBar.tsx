"use client";

import Logo from "./logo";
import Image from "next/image";
import "@fontsource/poppins";
import { ClientNotification, TutorNotification } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { ClientDropdown } from "./clientDropdown";
import { TutorDropdown } from "./tutorDropdown";
import ClientProfile from "./clientProfile";
import TutorProfile from "./tutorProfile";
import LoginDropdown from "./loginDropdown";
import RegisterDropdown from "./registerDropdown";

type NavBarProps = {
	userImage: string | null;
	userName: string | null;
	userId: number | null;
	userRole: "client" | "tutor" | null;
	userNotifications: ClientNotification[] | TutorNotification[];
};

const NavBar = ({ userImage, userName, userRole, userId, userNotifications }: NavBarProps) => {
	const [clientsDropdown, setClientsDropdown] = useState(false);
	const [tutorsDropdown, setTutorsDropdown] = useState(false);
	const [registerDropdown, setRegisterDropdown] = useState(false);
	const [loginDropdown, setLoginDropdown] = useState(false);
	const [clientProfile, setClientProfile] = useState(false);
	const [tutorProfile, setTutorProfile] = useState(false);
	const clientDropdownRef = useRef<HTMLDivElement>(null);
	const tutorDropdownRef = useRef<HTMLDivElement>(null);
	const registerRef = useRef<HTMLDivElement>(null);
	const loginRef = useRef<HTMLDivElement>(null);
	const clientProfileRef = useRef<HTMLDivElement>(null);
	const tutorProfileRef = useRef<HTMLDivElement>(null);
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);

	useEffect(() => {
		let handler = (e: MouseEvent) => {
			if (clientDropdownRef.current && !clientDropdownRef.current.contains(e.target as Node)) {
				setClientsDropdown(false);
			}
			if (tutorDropdownRef.current && !tutorDropdownRef.current.contains(e.target as Node)) {
				setTutorsDropdown(false);
			}
			if (registerRef.current && !registerRef.current.contains(e.target as Node)) {
				setRegisterDropdown(false);
			}
			if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
				setLoginDropdown(false);
			}
			if (clientProfileRef.current && !clientProfileRef.current.contains(e.target as Node)) {
				setClientProfile(false);
			}
			if (tutorProfileRef.current && !tutorProfileRef.current.contains(e.target as Node)) {
				setTutorProfile(false);
			}
		};
		document.addEventListener("mousedown", handler);
	});

	const handleMouseEnter = (index: number) => {
		setHoverIndex(index);
	};

	const handleMouseLeave = () => {
		setHoverIndex(null);
	};

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
		marginBottom: "6px"
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
		notificationCircle: {
			width: "24px",
			height: "24px",
			backgroundColor: "#5790AB",
			borderRadius: "50%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "#fff",
			fontSize: "12px",
			fontWeight: "bold",
			marginLeft: "8px",
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
					<a href="/" style={hoverText(6)} onMouseEnter={() => handleMouseEnter(6)} onMouseLeave={handleMouseLeave}>
						Home
					</a>
				</div>
				{(userRole === "client" || !userRole) && (
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
							<Image src="/images/arrowdown.png" alt="Arrow down" width={20} height={20} />
						</button>
						{clientsDropdown && <ClientDropdown id={userId || -1} />}
					</div>
				)}
				{(userRole === "tutor" || !userRole) && (
					<div className="relative" ref={tutorDropdownRef}>
						<button
							style={hoverText(1)}
							onMouseEnter={() => handleMouseEnter(1)}
							onMouseLeave={handleMouseLeave}
							onClick={() => setTutorsDropdown(!tutorsDropdown)}
							className="flex items-center"
						>
							For Tutors
							<Image src="/images/arrowdown.png" alt="Arrow down" width={20} height={20} />
						</button>
						{tutorsDropdown && <TutorDropdown id={userId || -1} />}
					</div>
				)}
				<div>
					<a href="/rates" style={hoverText(2)} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
						Tuition Rates
					</a>
				</div>
				<div>
					<a href="/faq" style={hoverText(3)} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
						FAQ
					</a>
				</div>
				<div>
					<a href="/contact_us" style={hoverText(4)} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}>
						Contact Us
					</a>
				</div>
			</div>
			<div className="flex items-center space-x-4">
				{userRole ? (
					userRole === "client" ? (
						<div className="flex items-center space-x-2" ref={clientProfileRef}>
							<button
								style={hoverText(6)}
								onMouseEnter={() => handleMouseEnter(6)}
								onMouseLeave={handleMouseLeave}
								onClick={() => setClientProfile(!clientProfile)}
								className="flex items-center"
							>
								<Image
									src={userImage || "/images/Blank Profile Photo.jpg"}
									alt="Profile Picture"
									width={40}
									height={40}
									className="rounded-full mr-2"
									style={{ width: "40px", height: "40px" }}
								/>
								<div style={profile.container}>
									<span style={profile.name}>{userName}</span>
									<h3 style={profile.role}>Client</h3>
								</div>
								{userNotifications.filter((notif) => !notif.read).length > 0 && (
									<div style={profile.notificationCircle}>{userNotifications.filter((notif) => !notif.read).length}</div>
								)}
							</button>
							{clientProfile && (
								<ClientProfile notificationCount={userNotifications.filter((notif) => !notif.read).length} id={userId || -1} />
							)}
						</div>
					) : (
						<div className="flex items-center space-x-2" ref={tutorProfileRef}>
							<button
								style={hoverText(7)}
								onMouseEnter={() => handleMouseEnter(7)}
								onMouseLeave={handleMouseLeave}
								onClick={() => setTutorProfile(!tutorProfile)}
								className="flex items-center"
							>
								<Image
									src={userImage || "/images/Blank Profile Photo.jpg"}
									alt="Profile Picture"
									width={40}
									height={40}
									className="rounded-full mr-2"
									style={{ width: "40px", height: "40px" }}
								/>
								<div style={profile.container}>
									<span style={profile.name}>{userName}</span>
									<h3 style={profile.role}>Tutor</h3>
								</div>
								{userNotifications.filter((notif) => !notif.read).length > 0 && (
									<div style={profile.notificationCircle}>{userNotifications.filter((notif) => !notif.read).length}</div>
								)}
							</button>
							{tutorProfile && (
								<TutorProfile notificationCount={userNotifications.filter((notif) => !notif.read).length} id={userId || -1} />
							)}
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
								onClick={() => setRegisterDropdown(!registerDropdown)}
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

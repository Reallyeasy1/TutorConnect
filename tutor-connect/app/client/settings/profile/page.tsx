"use client";

import NavBar from "@/components/nav-bar/navBar";
import React, { useState, useEffect } from "react";
import Footer from "@/components/footer/footer";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const [file, setFile] = useState<File | null>(null); // Changed to File type for handling file uploads
	const [error, setError] = useState<string | null>(null);
	const [profile, setProfile] = useState({
		email: "",
		contactNumber: "",
		address: "",
		postalCode: "",
		name: "",
		image: "",
	});
	const [modifiedFields, setModifiedFields] = useState<Set<string>>(
		new Set()
	);

	useEffect(() => {
		const fetchClientDetails = async () => {
			if (status === "authenticated" && session?.user?.email) {
				try {
					const res = await fetch("/api/client/getClientDetails", {
						method: "POST",
						body: JSON.stringify({
							email: session.user.email,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (res.ok) {
						const clientData = await res.json();
						setProfile(clientData);
					} else {
						console.error("Failed to fetch client details");
					}
				} catch (error) {
					console.error("Error fetching client details:", error);
				}
			}
		};
		fetchClientDetails();
	}, [session, status]);

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

	const handleResetPassword = () => {
		router.push("/client/forgot_password");
	};

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			const maxSize = 2 * 1024 * 1024;

			if (file.size > maxSize) {
				alert("File size exceeds 2MB");
				return;
			}

			const blobUrl = URL.createObjectURL(file);
			setProfile({
				...profile,
				image: blobUrl,
			});
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[name]: value,
		}));
		setModifiedFields((prevModifiedFields) => {
			const newModifiedFields = new Set(prevModifiedFields);
			newModifiedFields.add(name);
			return newModifiedFields;
		});
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			modifiedFields.has("contactNumber") &&
			profile.contactNumber.length !== 8
		) {
			setError("Contact number must be 8 digits");
			return;
		}

		if (
			modifiedFields.has("postalCode") &&
			profile.postalCode.length !== 6
		) {
			setError("Postal code must be 6 digits");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("email", profile.email);
			formData.append("contactNumber", profile.contactNumber);
			formData.append("address", profile.address);
			formData.append("postalCode", profile.postalCode);
			if (profile.image) {
				formData.append("image", profile.image);
			}

			const res = await fetch("/api/client/edit_profile", {
				method: "POST",
				body: formData,
			});
			if (res.ok) {
				alert("Changes saved successfully");
			} else {
				alert("Failed to save changes");
			}
		} catch (error) {
			console.error("Error updating client details:", error);
		}
	};

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
		divider: {
			borderBottom: "1px solid #d9d9d9",
		},
		icon: {
			marginRight: "10px",
		},
	};

	const profileCard = {
		container: {
			display: "flex",
			justifyContent: "center",
			alignItems: "flex-start",
		},
		card: {
			backgroundColor: "#fff",
			borderRadius: "10px",
			padding: "20px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
			width: "500px",
		},
		profileImage: {
			width: "100px",
			height: "100px",
			borderRadius: "50%",
			backgroundColor: "#fff",
			position: "relative" as "relative",
			margin: "0 auto",
			marginBottom: "20px",
		},
		editIcon: {
			position: "absolute" as "absolute",
			bottom: "0",
			right: "10px",
			backgroundColor: "#fff",
			borderRadius: "50%",
			padding: "5px",
			boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
		},
		clientName: {
			fontSize: "24px",
			fontWeight: "bold",
			marginBottom: "20px",
			textAlign: "center" as "center",
		},
		form: {
			display: "flex",
			flexDirection: "column" as "column",
			alignItems: "flex-start",
		},
		label: {
			alignSelf: "flex-start",
			marginBottom: "5px",
			fontSize: "13px",
			fontFamily: "Inter",
			textAlign: "left",
		},
		input: {
			width: "100%",
			padding: "6px",
			marginTop: "7px",
			marginBottom: "10px",
			borderRadius: "5px",
			border: "1px solid #ccc",
		},
		buttonContainer: {
			display: "flex",
			justifyContent: "space-between",
			width: "100%",
			marginTop: "10px",
		},
		saveButton: {
			width: "49.5%",
			padding: "10px",
			backgroundColor: "#5790AB",
			color: "#fff",
			border: "none",
			borderRadius: "5px",
			fontWeight: "bold",
			cursor: "pointer",
		},
		resetPasswordButton: {
			width: "49.5%",
			padding: "10px",
			backgroundColor: "#FFFFFF",
			color: "#5790AB",
			border: "1px solid #5790AB",
			borderRadius: "5px",
			fontWeight: "bold",
			cursor: "pointer",
		},
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center">
			<NavBar />
			<div style={profileCard.container} className="py-6">
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
							<li
								style={hoverText(0)}
								onMouseEnter={() => handleMouseEnter(0)}
								onMouseLeave={handleMouseLeave}
							>
								<a href="#" style={sidebar.navLink}>
									<span style={sidebar.icon}>🔔</span>
									Notifications
								</a>
							</li>
							<li
								style={hoverText(1)}
								onMouseEnter={() => handleMouseEnter(1)}
								onMouseLeave={handleMouseLeave}
							>
								<a href="#" style={sidebar.navLink}>
									<span style={sidebar.icon}>❓</span>
									Help
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div style={profileCard.container}>
					<div style={sidebar.container}>
						<h2 style={sidebar.title}>Personal Information</h2>
						<div style={profileCard.card}>
							<form onSubmit={onSubmit}>
								<div style={profileCard.profileImage}>
									<Image
										src={
											profile.image
												? profile.image
												: "/images/Blank Profile Photo.jpg"
										}
										alt="Profile Picture"
										width={100}
										height={100}
										className="rounded-full mr-2"
										style={{
											width: "100px",
											height: "100px",
										}}
									/>
									<input
										type="file"
										id="fileInput"
										style={{ display: "none" }}
										onChange={handlePhotoChange}
										accept=".png, .jpg, .jpeg, .gif"
									/>
									<button
										type="button"
										style={profileCard.editIcon}
										onClick={() =>
											document
												.getElementById("fileInput")
												?.click()
										}
									>
										✏️
									</button>
								</div>
								<h2 style={profileCard.clientName}>
									{profile.name}
								</h2>
								<Label htmlFor="email">
									Email (Cannot be changed)
								</Label>
								<input
									type="email"
									name="email"
									value={profile.email}
									style={profileCard.input}
									readOnly
								/>

								<Label htmlFor="contactNumber">
									Contact Number
								</Label>
								<input
									type="contactNumber"
									name="contactNumber"
									value={profile.contactNumber}
									onChange={handleInputChange}
									style={profileCard.input}
									required
								/>

								<Label htmlFor="address">Address</Label>
								<input
									type="address"
									name="address"
									value={profile.address}
									onChange={handleInputChange}
									style={profileCard.input}
									required
								/>

								<Label htmlFor="postalCode">Postal Code</Label>
								<input
									type="postalCode"
									name="postalCode"
									value={profile.postalCode}
									onChange={handleInputChange}
									style={profileCard.input}
									required
								/>

								<div style={profileCard.buttonContainer}>
									<button
										type="button"
										style={profileCard.resetPasswordButton}
										onClick={handleResetPassword}
									>
										Reset Password
									</button>
									<button
										type="submit"
										style={profileCard.saveButton}
									>
										Save Changes
									</button>
								</div>
								{error && (
									<p style={{ color: "red" }}>{error}</p>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

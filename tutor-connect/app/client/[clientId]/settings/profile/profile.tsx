"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { PutBlobResult } from "@vercel/blob";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";

interface ClientData {
	email: string;
	name: string;
	contactNumber: string;
	address: string;
	unitNumber: string;
	postalCode: string;
	image?: string;
}

export default function ProfilePage({ clientData }: { clientData: ClientData }) {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [newImage, setNewImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [profile, setProfile] = useState<ClientData>(clientData);
	const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());
	const [submit, setSubmit] = useState(false);

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

			const previewURL = URL.createObjectURL(file);
			setPreview(previewURL);
			setNewImage(file);
			setModifiedFields((prevModifiedFields) => {
				const newModifiedFields = new Set(prevModifiedFields);
				newModifiedFields.add("image");
				return newModifiedFields;
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
		setSubmit(true);

		if (modifiedFields.has("contactNumber") && profile.contactNumber.length !== 8) {
			setError("Contact number must be 8 digits");
			setSubmit(false);
			return;
		}

		if (modifiedFields.has("postalCode") && profile.postalCode.length !== 6) {
			setError("Postal code must be 6 digits");
			setSubmit(false);
			return;
		}

		try {
			const formData = new FormData();
			formData.append("email", profile.email);
			formData.append("contactNumber", profile.contactNumber);
			formData.append("address", profile.address);
			formData.append("unitNumber", profile.unitNumber);
			formData.append("postalCode", profile.postalCode);
			if (modifiedFields.has("image") && newImage) {
				if (profile.image) {
					const imageLink = profile.image;
					const deleteRes = await fetch(`/api/client/edit_profile/image_upload`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ imageLink }),
					});

					if (!deleteRes.ok) {
						alert("Failed to delete old image");
						setSubmit(false);
						return;
					}
				}
				const imageRes = await fetch(`/api/client/edit_profile/image_upload?filename=${newImage.name}`, {
					method: "POST",
					body: newImage,
				});

				if (imageRes.ok) {
					const imageBlob: PutBlobResult = await imageRes.json();
					formData.append("image", imageBlob.url);
				} else {
					alert("Failed to upload new image");
					setSubmit(false);
					return;
				}
			}

			const res = await fetch("/api/client/edit_profile", {
				method: "POST",
				body: formData,
			});

			if (res.ok) {
				alert("Changes saved successfully");
				router.refresh();
			} else {
				alert("Failed to save changes");
				setSubmit(false);
			}
		} catch (error) {
			console.error("Error updating client details:", error);
			setSubmit(false);
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
		<div style={profileCard.container}>
			<div style={sidebar.container}>
				<h2 style={sidebar.title}>Personal Information</h2>
				<div style={profileCard.card}>
					<form onSubmit={onSubmit}>
						<div style={profileCard.profileImage}>
							<Image
								src={preview ? preview : profile.image ? profile.image : "/images/Blank Profile Photo.jpg"}
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
							<button type="button" style={profileCard.editIcon} onClick={() => document.getElementById("fileInput")?.click()}>
								✏️
							</button>
						</div>
						<h2 style={profileCard.clientName}>{profile.name}</h2>
						<Label htmlFor="email">Email (Cannot be changed)</Label>
						<Input type="email" name="email" value={profile.email} style={profileCard.input} readOnly />

						<Label htmlFor="contactNumber">Contact Number</Label>
						<Input
							type="contactNumber"
							name="contactNumber"
							value={profile.contactNumber}
							onChange={handleInputChange}
							style={profileCard.input}
							required
						/>

						<Label htmlFor="address">Address</Label>
						<Input
							type="address"
							name="address"
							value={profile.address}
							onChange={handleInputChange}
							style={profileCard.input}
							required
						/>

						<Label htmlFor="unitNumber">Unit Number</Label>
						<Input
							type="unitNumber"
							name="unitNumber"
							value={profile.unitNumber}
							onChange={handleInputChange}
							style={profileCard.input}
							required
						/>

						<Label htmlFor="postalCode">Postal Code</Label>
						<Input
							type="postalCode"
							name="postalCode"
							value={profile.postalCode}
							onChange={handleInputChange}
							style={profileCard.input}
							required
						/>

						<div style={profileCard.buttonContainer}>
							<Button type="button" style={profileCard.resetPasswordButton} onClick={handleResetPassword}>
								Reset Password
							</Button>
							<Button type="submit" style={profileCard.saveButton} disabled={submit}>
								{submit ? <><Spinner /> Saving Changes...</> : "Save Changes"}
							</Button>
						</div>
						{error && <p style={{ color: "red" }}>{error}</p>}
					</form>
				</div>
			</div>
		</div>
	);
}

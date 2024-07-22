"use client";
import NavBar from "@/components/nav-bar/navBar";
import React from "react";
import Image from "next/image";
import Footer from "@/components/footer/footer";

export default function HomePage() {
	const styles = {
		body: {
			fontFamily: "Poppins, sans-serif",
			margin: 0,
			padding: 0,
			boxSizing: "border-box" as "border-box",
		},
		sectionContainer: {
			width: "85%",
			margin: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			//backgroundColor: "#EFF8FA",
			padding: "2em 0",
		},
		sectionLeftImage: {
			width: "70%",
			height: "100%",
		},
		sectionRight: {
			width: "50%",
			backgroundColor: "rgba(255, 255, 255, 0.85)",
			display: "flex",
			flexDirection: "column" as "column",
			alignItems: "flex-start",
			justifyContent: "center",
			padding: "1.5em 2em",
			marginLeft: "-100px",
		},
		sectionHeader: {
			fontFamily: "Playfair Display",
			fontWeight: "bold",
			fontSize: 34,
			marginBottom: "24px",
			lineHeight: "1.2",
		},
		sectionBody: {
			fontFamily: "Poppins",
			fontSize: 15,
			color: "#5790AB",
			marginBottom: "24px",
		},
		sectionButton: {
			backgroundColor: "#5790AD",
			fontFamily: "Poppins",
			color: "#fff",
			padding: "0.75em 3em",
			textDecoration: "none",
			display: "inline-block",
			alignSelf: "center",
		},
		features: {
			display: "flex",
			justifyContent: "space-around",
			padding: "2em 8em",
			backgroundColor: "#EFF8FA",
		},
		featuresContainer: {
			padding: "8px",
			backgroundColor: "#EFF8FA",
			textAlign: "center" as "center",
		},
		feature: {
			textAlign: "center" as "center",
			width: "220px",
		},
		featureTitle: {
			backgroundColor: "#EFF8FA",
			marginTop: "20px",
			color: "#313131",
			fontFamily: "Playfair Display",
			fontWeight: "bold",
			fontSize: 44,
		},
		featureHeading: {
			fontFamily: "Poppins",
			fontSize: 16,
			color: "#313131",
			textAlign: "left" as "left",
			fontWeight: "bold",
		},
		featureBody: {
			fontFamily: "Poppins",
			fontSize: 12,
			color: "#909090",
			textAlign: "left" as "left",
		},
		ctaSection: {
			textAlign: "center" as "center",
			padding: "4em 1em",
		},
	};

	return (
		<div style={styles.body}>
			<NavBar />
			<div style={styles.sectionContainer}>
				<Image
					src="/images/tutorteaching.jpg"
					alt="Tutor Image"
					width={600}
					height={250}
					style={styles.sectionLeftImage}
				/>
				<div style={styles.sectionRight}>
					<h1 style={styles.sectionHeader}>
						Find the right tutor
						<span
							style={{
								verticalAlign: "middle",
								display: "inline-block",
								marginLeft: "20px",
							}}
						>
							<Image
								src="/images/smallrectangle.png"
								alt="rectangle"
								width={50}
								height={3}
							/>
						</span>
						<br />
						with TutorConnect
					</h1>
					<p style={styles.sectionBody}>
						Find the perfect tutor for your needs instantly with
						TutorConnect&apos;s personalized matchmaking algorithm
					</p>
					<a href="/client/register" style={styles.sectionButton}>
						Register & Request Now
					</a>
				</div>
			</div>
			<div style={styles.features}>
				<div style={styles.feature}>
					<Image
						src="/images/Hourglass.png"
						alt="Find Tutors Instantly"
						width={50}
						height={50}
					/>
					<h3 style={styles.featureHeading}>Find Tutors Instantly</h3>
					<p style={styles.featureBody}>
						Our personalised algorithm gives you a list of tutors to
						choose from.
					</p>
				</div>
				<div style={styles.feature}>
					<Image
						src="/images/moneybag.png"
						alt="No Agency Fees"
						width={50}
						height={50}
					/>
					<h3 style={styles.featureHeading}>No Agency Fees</h3>
					<p style={styles.featureBody}>
						Only pay a one-time matchmaking fee.
					</p>
				</div>
				<div style={styles.feature}>
					<Image
						src="/images/tutor.png"
						alt="Verified Tutors"
						width={50}
						height={50}
					/>
					<h3 style={styles.featureHeading}>Verified Tutors</h3>
					<p style={styles.featureBody}>
						All tutors&apos; credentials are verified.
					</p>
				</div>
			</div>
            <div style={styles.sectionContainer}>
				<Image
					src="/images/tutorphoto2.jpeg"
					alt="Tutor Image"
					width={600}
					height={250}
					style={styles.sectionLeftImage}
				/>
				<div style={styles.sectionRight}>
					<h1 style={styles.sectionHeader}>
						Looking for clients?
						<span
							style={{
								verticalAlign: "middle",
								display: "inline-block",
								marginLeft: "20px",
							}}
						>
							<Image
								src="/images/smallrectangle.png"
								alt="rectangle"
								width={50}
								height={3}
							/>
						</span>
						<br />
						Join TutorConnect today!
					</h1>
					<p style={styles.sectionBody}>
                    Are you a passionate tutor looking for more students? Sign up now to find clients who need your expertise today!
					</p>
					<a href="/tutor/register" style={styles.sectionButton}>
						Register as a Tutor
					</a>
				</div>
			</div>
			<div style={styles.featuresContainer}>
				<h2 style={styles.featureTitle}>Matchmaking Made Easy!</h2>
				<div style={styles.features}>
					<div style={styles.feature}>
						<Image
							src="/images/exam.png"
							alt="Register and Request"
							width={50}
							height={50}
						/>
						<h3 style={styles.featureHeading}>
							Register and Request
						</h3>
						<p style={styles.featureBody}>
							Create an account with us and start requesting for
							tutors.
						</p>
					</div>
					<div style={styles.feature}>
						<Image
							src="/images/recruitment.png"
							alt="Select a Tutor"
							width={50}
							height={50}
						/>
						<h3 style={styles.featureHeading}>Select a Tutor</h3>
						<p style={styles.featureBody}>
							Choose from a list of tutors and start negotiating
							with them.
						</p>
					</div>
					<div style={styles.feature}>
						<Image
							src="/images/hand-shake.png"
							alt="Confirmation"
							width={50}
							height={50}
						/>
						<h3 style={styles.featureHeading}>Confirmation</h3>
						<p style={styles.featureBody}>
							Matchmaking is confirmed once both parties agree.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
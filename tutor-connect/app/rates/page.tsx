"use client";
import React from "react";
import Footer from "@/components/footer/footer";
import Image from "next/image";

export default function Rates() {
	const styles = {
		ratesContainer: {
			width: "65%",
			margin: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "2em 0",
			flexDirection: "column" as "column",
		},
		tutorContainer: {
			width: "65%",
			margin: "auto",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "2em 0",
			flexDirection: "column" as "column",
		},
		tutorSection: {
			backgroundColor: "#EFF8FA",
			width: "100%",
		},
		title: {
			font: "Poppins",
			fontSize: "32px",
			textAlign: "center" as "center",
			fontWeight: "bold",
			margin: "15px 0",
		},
		subtitle: {
			font: "Poppins",
			fontSize: "18px",
			color: "#909090",
			textAlign: "center" as "center",
			marginBottom: "16px",
		},
		emptyCell: {
			padding: "8px",
			width: "200px",
		},
		image: {
			width: "135px",
			height: "135px",
			border: "1px solid #ddd",
			display: "block",
			margin: "auto",
			backgroundColor: "#ffffff",
		},
		table: {
			width: "100%",
			borderCollapse: "collapse" as "collapse",
			margin: "20px 0",
		},
		tableHeader: {
			backgroundColor: "#5790AB",
			color: "white",
			font: "Poppins",
			fontSize: "16px",
			textAlign: "center" as "center",
			fontWeight: "bold",
			padding: "10px",
		},
		cell: {
			border: "1px solid #ddd",
			padding: "10px",
			textAlign: "center" as "center",
			font: "Poppins",
			fontSize: "16px",
			backgroundColor: "#ffffff",
		},
		level: {
			backgroundColor: "#EFF8FA",
			padding: "10px",
			textAlign: "center" as "center",
			fontWeight: "bold",
			fontSize: "16px",
			font: "Poppins",
			border: "1px solid #ddd",
		},
	};

	return (
		<div style={{ backgroundColor: "#fff" }}>
			<div style={styles.ratesContainer}>
				<div style={styles.title}>Home Tuition Rates</div>
				<div style={styles.subtitle}>
					To provide you with an understanding of how our pricing structure aligns with your rates, please review our tuition rates, which
					are based on current market standards.
				</div>
				<table style={styles.table}>
					<thead>
						<tr>
							<th style={styles.emptyCell}></th>
							<th style={styles.emptyCell}>
								<Image
									src="/images/student.png"
									alt="Part-Time Tutor"
									width={135}
									height={135}
									className="rounded-full  mr-2"
									style={styles.image}
								/>
							</th>
							<th style={styles.emptyCell}>
								<Image
									src="/images/graduate.png"
									alt="Full-Time Tutor"
									width={135}
									height={135}
									className="rounded-full  mr-2"
									style={styles.image}
								/>
							</th>
							<th style={styles.emptyCell}>
								<Image
									src="/images/teacher.png"
									alt="Ex/Current MOE Teacher"
									width={135}
									height={135}
									className="rounded-full  mr-2"
									style={styles.image}
								/>
							</th>
						</tr>
						<tr>
							<th></th>
							<th style={styles.tableHeader}>Part-Time Tutors</th>
							<th style={styles.tableHeader}>Full-Time Tutors</th>
							<th style={styles.tableHeader}>Ex/Current MOE Teachers</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={styles.level}>Pre-School</td>
							<td style={styles.cell}>$25-$35/h</td>
							<td style={styles.cell}>$30-$40/h</td>
							<td style={styles.cell}>$50-$70/h</td>
						</tr>
						<tr>
							<td style={styles.level}>Lower Primary</td>
							<td style={styles.cell}>$25-$35/h</td>
							<td style={styles.cell}>$35-$45/h</td>
							<td style={styles.cell}>$55-$75/h</td>
						</tr>
						<tr>
							<td style={styles.level}>Upper Primary</td>
							<td style={styles.cell}>$30-$40/h</td>
							<td style={styles.cell}>$40-$50/h</td>
							<td style={styles.cell}>$60-$80/h</td>
						</tr>
						<tr>
							<td style={styles.level}>Lower Secondary</td>
							<td style={styles.cell}>$30-$45/h</td>
							<td style={styles.cell}>$45-$55/h</td>
							<td style={styles.cell}>$60-$85/h</td>
						</tr>
						<tr>
							<td style={styles.level}>Upper Secondary</td>
							<td style={styles.cell}>$35-$45/h</td>
							<td style={styles.cell}>$45-$60/h</td>
							<td style={styles.cell}>$65-$95/h</td>
						</tr>
						<tr>
							<td style={styles.level}>JC</td>
							<td style={styles.cell}>$40-$55/h</td>
							<td style={styles.cell}>$60-$85/h</td>
							<td style={styles.cell}>$90-$130/h</td>
						</tr>
						<tr>
							<td style={styles.level}>IB</td>
							<td style={styles.cell}>$40-$55/h</td>
							<td style={styles.cell}>$60-$85/h</td>
							<td style={styles.cell}>$90-$130/h</td>
						</tr>
						<tr>
							<td style={styles.level}>IGCSE</td>
							<td style={styles.cell}>$30-$55/h</td>
							<td style={styles.cell}>$45-$85/h</td>
							<td style={styles.cell}>$60-$120/h</td>
						</tr>
						<tr>
							<td style={styles.level}>Poly / University</td>
							<td style={styles.cell}>$40-$65/h</td>
							<td style={styles.cell}>$60-$95/h</td>
							<td style={styles.cell}>$100-$130/h</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style={styles.tutorSection}>
				<div style={styles.tutorContainer}>
					<div style={styles.title}>Types of Home Tutors</div>
					<div style={styles.subtitle}>
						In this section, we break down the three main types of home tutors you can find in Singapore, highlighting the unique
						qualities of part-time tutors, full-time tutors, and ex/current MOE teachers.
					</div>
					<table style={styles.table}>
						<thead>
							<tr>
								<th style={styles.emptyCell}>
									<Image
										src="/images/student.png"
										alt="Part-Time Tutor"
										width={135}
										height={135}
										className="rounded-full  mr-2"
										style={styles.image}
									/>
								</th>
								<th style={styles.emptyCell}>
									<Image
										src="/images/graduate.png"
										alt="Full-Time Tutor"
										width={135}
										height={135}
										className="rounded-full  mr-2"
										style={styles.image}
									/>
								</th>
								<th style={styles.emptyCell}>
									<Image
										src="/images/teacher.png"
										alt="Ex/Current MOE Teacher"
										width={135}
										height={135}
										className="rounded-full  mr-2"
										style={styles.image}
									/>
								</th>
							</tr>
							<tr>
								<th style={styles.tableHeader}>Part-Time Tutors</th>
								<th style={styles.tableHeader}>Full-Time Tutors</th>
								<th style={styles.tableHeader}>Ex/Current MOE Teachers</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style={styles.cell}>0-3 Years of Experience</td>
								<td style={styles.cell}>More than 3 Years of Experience</td>
								<td style={styles.cell}>MOE & NIE Trained</td>
							</tr>
							<tr>
								<td style={styles.cell}>Mostly Undergraduates</td>
								<td style={styles.cell}>Mostly Graduates</td>
								<td style={styles.cell}>Familiar with the Latest MOE Syllabus & Pedagogy</td>
							</tr>
							<tr>
								<td style={styles.cell}>Good Academic Grades</td>
								<td style={styles.cell}>Highly Experienced</td>
								<td style={styles.cell}>Vast Classroom Teaching Experience</td>
							</tr>
							<tr>
								<td style={styles.cell}>Most Budget Friendly Option</td>
								<td style={styles.cell}>Highest Commitment</td>
								<td style={styles.cell}>Most Qualified</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<Footer />
		</div>
	);
}

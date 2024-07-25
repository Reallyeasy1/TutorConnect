"use client";

import React, { useEffect, useState } from "react";
import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/customTabs";

export default function FAQPage() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	const clientFAQs = [
		{
			question: "How Do I Register For A Tuition Teacher?",
			answer: "You may register for a tuition teacher by taking 1-2 minutes to fill up our simple form here. Or alternatively, you may contact us at +65 84829619 or skibidiToilet@gmail.com.",
		},
		{
			question: "Do I Have To Pay Any Extra Fees?",
			answer: "No, there are no extra fees.",
		},
		{
			question: "What Are The Types of Tutors Available?",
			answer: "We offer a wide range of tutors, including those who specialize in different subjects, levels, and student needs. Contact us to find the right tutor for you.",
		},
		{
			question: "Do You Provide Trial Lessons?",
			answer: "Yes, we do provide trial lessons. Please contact us to schedule a trial lesson with your selected tutor.",
		},
		{
			question: "What If The Tutor Is Not Suitable?",
			answer: "If the tutor is not suitable, you can request a change of tutor. We will work with you to find a better match for your needs.",
		},
		{
			question: "How Is Payment Made?",
			answer: "Payment can be made via bank transfer, credit card, or PayPal. Details will be provided upon confirmation of the tutoring arrangement.",
		},
		// Add more FAQs as needed
	];

	const tutorFAQs = [
		{
			question: "How Do I Sign Up As A Tutor?",
			answer: "Sign up by filling our registration form here.",
		},
		{
			question: "What Are The Requirements To Be A Tutor?",
			answer: "The requirements are listed in our guidelines here.",
		},
		{
			question: "How Do I Get Matched With Students?",
			answer: "Once you have registered as a tutor, we will match you with students based on your qualifications, experience, and the subjects you teach.",
		},
		{
			question: "How Do I Schedule Lessons With Students?",
			answer: "You can schedule lessons with students through our platform. Both tutors and students have the flexibility to arrange lesson times that are convenient for both parties.",
		},
		{
			question: "How Is Payment Processed?",
			answer: "Payment is processed through our platform. Tutors will receive payment directly into their bank accounts after each lesson or on a monthly basis, depending on the arrangement.",
		},
		{
			question: "What If I Have A Problem With A Student?",
			answer: "If you encounter any problems with a student, please contact our support team immediately. We are here to help resolve any issues you may have.",
		},
		// Add way more FAQs as needed
	];

	const styles = {
		title: {
			font: "Poppins",
			fontSize: "32px",
			textAlign: "center" as "center",
			fontWeight: "bold",
			padding: "20px",
		},
		container: {
			display: "flex",
			flexDirection: "column" as "column",
			justifyContent: "center",
			alignItems: "center",
			padding: "20px",
			width: "70%",
		},
		main: {
			display: "flex",
			justifyContent: "center",
			alignItems: "flex-start",
			flex: "1",
			border: "1px solid #5790AB",
		},
		blueButton: {
			backgroundColor: "#5790AB",
			color: "#fff",
			padding: "10px 20px",
			borderRadius: "5px",
			fontSize: "16px",
			marginRight: "10px",
			fontWeight: "bold",
		},
		text: {
			fontSize: "16px",
			fontWeight: "normal" as "normal",
			font: "Poppins",
			color: "#000",
			textAlign: "justify" as "justify",
		},
		question: {
			fontSize: "18px",
			fontWeight: "bold",
			color: "#000",
			textAlign: "left" as "left",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		},
	};

	return (
		<div className="flex flex-col min-h-screen">
			<div style={styles.main}>
				<div style={styles.container}>
					{/* Check to see if current is at client or tutor */}
					<h1 style={styles.title}>FAQ</h1>
					<div style={{ width: "100%" }}>
						<Tabs defaultValue="Client">
							<TabsList
								className="grid w-full grid-cols-2"
								style={{
									marginBottom: "20px",
									backgroundColor: "#eff8fa",
									color: "#5790AB",
								}}
							>
								<TabsTrigger value="Client">Client</TabsTrigger>
								<TabsTrigger value="Tutor">Tutor</TabsTrigger>
							</TabsList>
							<TabsContent value="Client">
								<div style={{ padding: "0 20px 0 20px" }}>
									{clientFAQs.map((question) => (
										<Accordion type="single" collapsible className="w-full" key={question.question}>
											<AccordionItem value={question.question} style={{ marginTop: "0.5em", padding: "0 5px" }}>
												<AccordionTrigger style={styles.question}>{question.question}</AccordionTrigger>
												<AccordionContent style={styles.text}>{question.answer}</AccordionContent>
											</AccordionItem>
										</Accordion>
									))}
								</div>
							</TabsContent>
							<TabsContent value="Tutor">
								<div style={{ padding: "0 20px 0 20px" }}>
									{tutorFAQs.map((question) => (
										<Accordion type="single" collapsible className="w-full" key={question.question}>
											<AccordionItem value={question.question} style={{ marginTop: "0.5em", padding: "0 5px" }}>
												<AccordionTrigger style={styles.question}>{question.question}</AccordionTrigger>
												<AccordionContent style={styles.text}>{question.answer}</AccordionContent>
											</AccordionItem>
										</Accordion>
									))}
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

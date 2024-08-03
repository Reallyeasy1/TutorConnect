"use client";

import Footer from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useParams } from "next/navigation";

//Pass in tutor id in checkout page
export default function PaymentSuccess({ searchParams: { amount } }: { searchParams: { amount: string; } }) {
	const router = useRouter();
	const params = useParams();
	const clientId = params.clientId;

	const toNotifications = () => {
		router.push(`/client/${clientId}/notifications`);
	};

	const blueButton = {
		backgroundColor: "#5790AB",
		color: "#fff",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundColor: "#fff" }}>
			<div className="flex-grow flex justify-center items-center py-6">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle className="text-center">Payment Success</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription className="text-center">
							Thank you for your payment of <strong>${amount}!</strong>
							<br />
							The tutor&apos;s phone number has been sent to your notifications.
						</CardDescription>
					</CardContent>
					<CardFooter className="flex flex-col items-center space-y-2">
						<Button style={blueButton} onClick={toNotifications}>
							To Notifications
						</Button>
					</CardFooter>
				</Card>
			</div>
			<Footer />
		</div>
	);
}

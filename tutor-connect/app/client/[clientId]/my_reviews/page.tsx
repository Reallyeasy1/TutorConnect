import Footer from "@/components/footer/footer";
import { redirect } from "next/navigation";
import { Reviews } from "./reviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export default async function MyReviews() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/client/invalid_session");
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/getReviews`, {
		method: "POST",
		body: JSON.stringify({
			clientId: session.user.id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch client reviews");
	}

	const clientData = await res.json();

	return (
		<div className="flex flex-col min-h-screen">
			<Reviews reviewData={clientData.reviews} />
			<Footer />
		</div>
	);
}

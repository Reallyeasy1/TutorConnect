import Footer from "@/components/footer/footer";
import { redirect } from "next/navigation";
import { Profile } from "./profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export default async function TutorProfile() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.id) {
		redirect("/tutor/invalid_session");
	}

	const tutorRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutor/getTutorDetails`, {
		method: "POST",
		body: JSON.stringify({
			tutorId: session.user.id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const reviewsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutor/getReviews`, {
		method: "POST",
		body: JSON.stringify({
			tutorId: session.user.id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!tutorRes.ok || !reviewsRes.ok) {
		throw new Error("Failed to fetch tutor assignments");
	}

	const tutorData = await tutorRes.json();
	const reviewsData = await reviewsRes.json();

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundColor: "#fff" }}>
			<Profile tutor={tutorData} reviews={reviewsData.reviews} averageRating={reviewsData.averageRating} />
			<Footer />
		</div>
	);
}

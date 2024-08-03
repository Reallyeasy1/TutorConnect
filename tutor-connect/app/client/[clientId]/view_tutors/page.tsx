import Footer from "@/components/footer/footer";
import { AllTutors } from "./tutors";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

export default async function ViewTutorsPage() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.id || !session.user.name) {
		redirect("/client/invalid_session");
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutor/allTutors`);

	if (!res.ok) {
		throw new Error("Failed to fetch tutors");
	}

	const clientRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/getDetails?clientId=${session.user.id}`);

	if (!clientRes.ok) {
		throw new Error("Failed to fetch client details");
	}

	const tutorsData = await res.json();
	const clientData = await clientRes.json();

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundColor: "#fff" }}>
			<AllTutors allTutors={tutorsData.tutors} client={clientData}/>
			<Footer />
		</div>
	);
}

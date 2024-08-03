import Footer from "@/components/footer/footer";
import SideBar from "./sideBar";
import Profile from "./profile";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

interface ClientData {
	email: string;
	name: string;
	contactNumber: string;
	address: string;
	unitNumber: string;
	postalCode: string;
	image?: string;
}

export default async function ProfilePage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/client/invalid_session");
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/getClientDetails`, {
		method: "POST",
		body: JSON.stringify({
			clientId: session.user.id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const clientData: ClientData = await res.json();

	const container = {
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
	};

	return (
		<div className="relative min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundColor: "#fff" }}>
			<div style={container} className="py-6">
				<SideBar />
				<Profile clientData={clientData} />
			</div>
			<Footer />
		</div>
	);
}

import { PostAssignmentForm } from "./form";
import Footer from "@/components/footer/footer";
import Logo from "@/components/nav-bar/logo";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function PostAssignmentPage() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.id) {
		redirect("/client/invalid_session");
	}

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/client/getDetails?clientId=${session.user.id}`);

	if (!res.ok) {
		throw new Error("Failed to fetch client details");
	}

	const clientData = await res.json();

	const logoText = {
		color: "#5790AB",
		fontFamily: "Poppins",
		fontSize: 28,
		fontWeight: "bold",
	};

	return (
		<div>
			<div className="h-full w-screen flex justify-center items-center bg-navy-100 py-6" style={{ backgroundColor: "#fff" }}>
				<div className="sm:shadow-xl px-8 pb-8 pt-8 sm:bg-white rounded-xl space-y-5">
					<div className="flex items-center justify-center">
						<Logo />
						<div style={logoText} className="ml-2">
							TutorConnect
						</div>
					</div>
					<h1 className="font-bold text-2xl text-center">Post an Assignment here!</h1>
					<PostAssignmentForm clientData={clientData} />
				</div>
			</div>
			<Footer />
		</div>
	);
}

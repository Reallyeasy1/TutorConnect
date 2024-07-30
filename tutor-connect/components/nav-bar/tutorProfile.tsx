import { useState } from "react";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

export default function TutorProfile({ notificationCount, id }: { notificationCount: number, id: number }) {
	const [hoveredIndex, setHoveredIndex] = useState(-1);

	const tutorItems = [
		{
			title: "My Profile",
			path: `/tutor/${id}/my_profile`,
			cName: "dropdown-link",
		},
		{
			title: "Notifications",
			path: `/tutor/${id}/notifications`,
			cName: "dropdown-link",
			hasNotification: notificationCount > 0,
		},
				{
			title: "Settings",
			path: `/tutor/${id}/settings/profile`,
			cName: "dropdown-link",
		},
		{
			title: "Sign Out",
			path: "#",
			cName: "dropdown-link",
			action: () => signOut({callbackUrl: '/'}),
		},
	];

	const notificationCircle = {
		width: "8px",
		height: "8px",
		backgroundColor: "#5790AB",
		borderRadius: "50%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "#fff",
		fontSize: "12px",
		fontWeight: "bold",
		marginLeft: "8px",
	};

	return (
		<div className="relative inline-block" style={{zIndex:50}}>
			<ul className="absolute right-5 top-8 bg-white border border-gray-300 rounded shadow-lg" style={{width: "140px"}}>
				{tutorItems.map((item, index) => (
					<li
						key={index}
						className={`px-3 py-2 ${
							index === hoveredIndex ? "bg-gray-200" : ""
						}`}
						onMouseEnter={() => setHoveredIndex(index)}
						onMouseLeave={() => setHoveredIndex(-1)}
						onClick={item.action ? item.action : undefined}
					>
						<a
							className={`${item.cName} block w-full h-full flex flex-row items-center`}
							href={item.path}
						>
							{item.title}
							{item.hasNotification && <div style={notificationCircle}></div>}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

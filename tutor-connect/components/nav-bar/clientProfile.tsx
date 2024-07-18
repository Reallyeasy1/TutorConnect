import { useState } from "react";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

export default function ClientProfile() {
	const [hoveredIndex, setHoveredIndex] = useState(-1);
	const params = useParams();
    const clientId = params.clientId;

	const clientItems = [
		{
			title: "Settings",
			path: `/client/${clientId}/settings/profile`,
			cName: "dropdown-link",
		},
		{
			title: "Notifications",
			path: `/client/${clientId}/notifications`,
			cName: "dropdown-link",
		},
		{
			title: "My Reviews",
			path: `/client/${clientId}/my_reviews`,
			cName: "dropdown-link",
		},
		{
			title: "Sign Out",
			path: "#",
			cName: "dropdown-link",
			action: () => signOut({callbackUrl: '/'}),
		},
	];

	return (
		<div className="relative inline-block" style={{zIndex:50}}>
			<ul className="absolute right-5 top-8 bg-white border border-gray-300 rounded shadow-lg" style={{width: "110px"}}>
				{clientItems.map((item, index) => (
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
							className={`${item.cName} block w-full h-full`}
							href={item.path}
						>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

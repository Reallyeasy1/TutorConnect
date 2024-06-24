import { useParams } from "next/navigation";
import { useState } from "react";

export default function ClientDropdown() {
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const params = useParams();
    const clientId = params.clientId;
    
    const clientItems = [
        {
            title: "Post Assignment",
            path: `/client/${clientId}/post_assignments`,
            cName: "dropdown-link"
        },
        {
            title: "View Assignments",
            path: "#",
            cName: "dropdown-link"
        },
        {
            title: "View Tutors",
            path: "#",
            cName: "dropdown-link"
        },
    ]

    return (
      <>
        <ul className="absolute -translate-x-5 mt-2 w-52 bg-white border rounded shadow-xl" style={{zIndex:50}}>
            {clientItems.map((item, index) => (
              <li
                key={index}
                className={`px-5 py-2 ${index === hoveredIndex ? 'bg-gray-200' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <a className={`${item.cName} block w-full h-full`} href={item.path}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
      </>
    );
  }
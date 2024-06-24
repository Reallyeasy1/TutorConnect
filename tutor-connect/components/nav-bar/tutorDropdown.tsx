import { useParams } from "next/navigation";
import { useState } from "react";

export default function TutorDropdown() {
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const params = useParams();
    const tutorId = params.tutorId;
    
    const tutorItems = [
        {
            title: "View Assignments",
            path: `/tutor/${tutorId}/view_assignments`,
            cName: "dropdown-link"
        },
        {
            title: "View Recommended Assignments",
            path: "#",
            cName: "dropdown-link"
        },
        {
            title: "Applied Assignments",
            path: "#",
            cName: "dropdown-link"
        },
    ]

    return (
      <>
        <ul className="absolute -translate-x-5 mt-2 w-52 bg-white border rounded shadow-xl" style={{zIndex:50}}>
            {tutorItems.map((item, index) => (
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
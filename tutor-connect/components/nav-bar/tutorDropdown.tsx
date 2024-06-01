import { useState } from "react";

export default function TutorDropdown() {
    const [click, setClick] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    
    const tutorItems = [
        {
            title: "View Assignments",
            path: "#",
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
        <ul className="absolute -translate-x-5 mt-2 w-52 bg-white border rounded shadow-xl">
            {tutorItems.map((item, index) => (
              <li
                key={index}
                className={`px-5 py-2 ${index === hoveredIndex ? 'bg-gray-200' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <a className={item.cName} href={item.path}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
      </>
    );
  }
import { useParams } from "next/navigation";
import { useState } from "react";

type ClientDropdownProps = {
  id: number;
};

export const ClientDropdown: React.FC<ClientDropdownProps> = ({ id }) => {
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const params = useParams();
    const clientId = params.clientId || id;
    
    const clientItems = [
        {
            title: "Post Assignment",
            path: `/client/${clientId}/post_assignments`,
            cName: "dropdown-link"
        },
        {
            title: "View Assignments",
            path: `/client/${clientId}/assignment/client_assignment`,
            cName: "dropdown-link"
        },
        {
            title: "View Tutors",
            path: `/client/${clientId}/view_tutors`,
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
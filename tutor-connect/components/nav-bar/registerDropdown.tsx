"use client"

import { useState } from "react";

export default function ClientDropdown() {
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    
    const register = [
        {
            title: "Client",
            path: "/client/register",
            cName: "dropdown-link"
        },
        {
            title: "Tutor",
            path: "/tutor/register",
            cName: "dropdown-link"
        }
    ]

    return (
      <>
        <ul className="absolute mt-2 bg-white border rounded shadow-xl" style={{zIndex:50}}>
            {register.map((item, index) => (
              <li
                key={index}
                className={`px-6 py-2 ${index === hoveredIndex ? 'bg-gray-200' : ''}`}
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
// //TODO: Add Avatar to the profile
// // TODO: For future reference, to update the list of pages to traverse to
// // TODO: Highlight current page
//TODO: Add links/dropdowns to the Nav Bar
//TODO: Add Nav Bar to the respective links
import Logo from "./logo";
import React from 'react';
import { useState } from 'react';
import "@fontsource/poppins";
import { MiddlewareNotFoundError } from "next/dist/shared/lib/utils";
import ClientDropdown from "./clientDropdown";
import TutorDropdown from "./tutorDropdown";

const NavBar = () => {
  const [clientsDropdown, setClientsDropdown] = useState(false);
  const [tutorsDropdown, setTutorsDropdown] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (index : number) => {
    setHoverIndex(index);
  }

  const handleMouseLeave = () => {
    setHoverIndex(null);
  }

  const bluetext = { 
    color: "#5790AB", 
    fontFamily: "Poppins", 
    fontSize: 16,
  }

  const hoverText = (index: number) => ({
    color: hoverIndex === index ? "#5790AB" : "#000000",
    fontFamily: "Poppins",
    fontSize: 16,
    textDecoration: hoverIndex === index ? "underline" : "none",
  })

  const logoText = { 
    color: "#5790AB", 
    fontFamily: "Poppins", 
    fontSize: 28,
    fontWeight: "bold",
  }
  const navBar = { 
    backgroundColor: "#FFFFFF", 
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", 
    padding: "16px 48px", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    width: "100%",
    top: 0,
  }

  const registerButton = {
    backgroundColor: "#5790AB",
    color: "#FFFFFF", 
    fontSize: 16,
  }
  
  return (
    <nav style={navBar}>
      <div className="flex items-center">
        <Logo />
        <div style={logoText} className="ml-2">TutorConnect</div>
      </div>
      <div className="flex-1 flex justify-center space-x-8">
        <div>
          <a 
            href="#"
            style = {hoverText(6)}
            onMouseEnter={() => handleMouseEnter(6)}
            onMouseLeave={handleMouseLeave}>Home</a>
        </div>
        <div className="relative">
          <button
            style = {hoverText(0)}
            onMouseEnter={() => {
              handleMouseEnter(0)
              setClientsDropdown(!clientsDropdown)
              }
            }
            onMouseLeave={
              () => {
              handleMouseLeave()
              setClientsDropdown(clientsDropdown)
              }
            }
          >
            For Clients
          </button>
          {clientsDropdown && (
              <ClientDropdown />
          )}
        </div>
        <div className="relative">
        <button
            style = {hoverText(1)}
            onMouseEnter={() => {
              handleMouseEnter(1)
              setTutorsDropdown(!tutorsDropdown)
              }
            }
            onMouseLeave={
              () => {
              handleMouseLeave()
              setTutorsDropdown(tutorsDropdown)
              }
            }
          >
            For Tutors
          </button>
          {tutorsDropdown && (
              <TutorDropdown />
          )}
        </div>
        <div>
          <a 
            href="#" 
            style = {hoverText(2)}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}>Tuition Rates</a>
        </div>
        <div>
          <a
            href="#" 
            style = {hoverText(3)}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}>FAQ</a>
        </div>
        <div>
          <a
            href="#" 
            style = {hoverText(4)}
            onMouseEnter={() => handleMouseEnter(4)}
            onMouseLeave={handleMouseLeave}>Contact Us</a>
          </div>
      </div>
      <div className="flex items-center">
        <button 
          className="px-4 py-2 rounded"
          style = {hoverText(5)}
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={handleMouseLeave}>Log In</button>
        <button className="px-4 py-2 rounded" style={registerButton}>Register</button>
      </div>
    </nav>
  );
};

export default NavBar;
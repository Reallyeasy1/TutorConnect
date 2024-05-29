// //TODO: Add Avatar to the profile
// // TODO: For future reference, to update the list of pages to traverse to
// // TODO: Highlight current page
//TODO: Add links/dropdowns to the Nav Bar
//TODO: Add Nav Bar to the respective links
import Logo from "./logo";
import React from 'react';
import { useState } from 'react';

const NavBar = () => {
  const [clientsDropdown, setClientsDropdown] = useState(false);
  const [tutorsDropdown, setTutorsDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-xl font-semibold text-blue-600">TutorConnect</div>
        <Logo/>
      </div>
      <div className="flex-1 flex justify-center space-x-8"> {/* Added flex-1 and justify-center */}
        <div>
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
        </div>
        <div className="relative">
          <button
            onClick={() => setClientsDropdown(!clientsDropdown)}
            className="text-gray-700 hover:text-blue-600"
          >
            For Clients
          </button>
          {clientsDropdown && (
            <div className="absolute mt-2 py-2 w-48 bg-white border rounded shadow-xl">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-blue-600 hover:text-white">Option 1</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-blue-600 hover:text-white">Option 2</a>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setTutorsDropdown(!tutorsDropdown)}
            className="text-gray-700 hover:text-blue-600"
          >
            For Tutors
          </button>
          {tutorsDropdown && (
            <div className="absolute mt-2 py-2 w-48 bg-white border rounded shadow-xl">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-blue-600 hover:text-white">Option 1</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-blue-600 hover:text-white">Option 2</a>
            </div>
          )}
        </div>
        <a href="#" className="text-gray-700 hover:text-blue-600">Tuition Rates</a>
        <a href="#" className="text-gray-700 hover:text-blue-600">FAQ</a>
        <a href="#" className="text-gray-700 hover:text-blue-600">Contact Us</a>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-700 hover:text-blue-600">Log In</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </div>
    </nav>
  );
};

export default NavBar;

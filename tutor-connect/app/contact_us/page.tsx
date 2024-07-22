"use client";

import NavBar from "@/components/nav-bar/navBar";
import React from "react";
import ContactUsHeader from "./ContactUsHeader";
import BlueBackground from "./BlueBackground";
import { ContactUsForm } from "./form";
import Footer from "@/components/footer/footer";

export default function RegisterPage() {
  return (
    <div> <NavBar />
    <div className="relative min-h-screen flex flex-col bg-cover bg-center mt-1">
   
      <ContactUsHeader />
      <div className="flex-grow flex flex-col items-center w-full py-6 mt-[-3.5%]">
{/* Make the below component  */}
        <div className="relative w-full flex justify-center">
          <BlueBackground />
          <div className="relative w-full max-w-lg bg-white p-8 rounded-xl shadow-lg z-10">
            <ContactUsForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
}
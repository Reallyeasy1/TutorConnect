"use client";

import React from "react";

const ContactUsHeader = () => {
  return (
    <div className="w-full text-center" style={{ backgroundColor: "#EFF8FA", padding: "20px" }}>
      <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
      <p className="mt-2 text-sm text-gray-500" style={{ padding: "0 0 20px 0" }}>
        Any burning questions that you want to ask? Submit your questions here and we will get back to you via email within 3 working days!
      </p>
    </div>
  );
};

export default ContactUsHeader;
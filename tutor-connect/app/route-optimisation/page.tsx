"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapForm } from "./form";
import loader from "./googleMapsLoader"; // Adjust the path as necessary

export default function MapPage() {
  const mapRef = useRef(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      map = new Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  }, []);

  useEffect(() => {
    if (googleMapsLoaded && mapRef.current) {
      const { Map } = google.maps;
      new Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }
  }, [googleMapsLoaded]);

  return (
    <div className="h-full w-screen flex flex-col justify-center items-center bg-navy-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12 mb-8">
        <MapForm />
      </div>
      <div className="h-500px w-500px" ref={mapRef}></div>
    </div>
  );
}

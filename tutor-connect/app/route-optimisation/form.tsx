"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import moment from "moment";

export const MapForm = () => {
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [stops, setStops] = React.useState([{ id: 0, address: "" }]);
  const [card, setCard] = React.useState(null);

  const changeDestination = (e) => setDestination(e.target.value);
  const changeStop = (id) => (e) => {
    setStops(
      stops.map((stop) =>
        stop.id === id ? { id: id, address: e.target.value } : stop
      )
    );
  };

  const addStop = () => {
    setStops([...stops, { id: stops[stops.length - 1].id + 1, address: "" }]);
  };

  const removeStop = (id) => () => {
    setStops(stops.filter((stop) => stop.id !== id));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const request = {
      origin: origin,
      destination: destination,
      waypoints: stops.map((stop) => ({
        location: stop.address,
        stopover: true,
      })),
      optimizeWaypoints: true,
      provideRouteAlternatives: false,
      drivingOptions: {
        departureTime: new Date(/* now, or future date */),
      },
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    };

  return (
    <Card>
      <CardHeader>
        <h1>Route Optimisation</h1>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-2">
          <h2>Where do you plan to go?</h2>
          <div className="space-y-1">
            <Label htmlFor="origin">Origin</Label>
            <Input
              required
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              id="origin"
              type="text"
              placeholder="Start"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {stops.map((stop) => (
              <div
                key={stop.id}
                style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}
              >
                <Input
                  value={stop.address}
                  onChange={changeStop(stop.id)}
                  id={`stop-${stop.id}`}
                  type="text"
                  placeholder="Next Stop"
                />
                <Button
                  onClick={removeStop(stop.id)}
                  variant="secondary"
                  type="button"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={addStop} className="w-full" type="button">
            Add Stop
          </Button>
          <div className="space-y-1">
            <Label htmlFor="destination">Destination</Label>
            <Input
              required
              value={destination}
              onChange={changeDestination}
              id="destination"
              type="text"
              placeholder="Destination"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Find your shortest route!
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
}

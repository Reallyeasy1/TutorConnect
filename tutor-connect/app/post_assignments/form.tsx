


'use client'

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

export const RegisterForm = () => {
 //TODO: Get a proper router and switch to [clientId]/postAssignments as the query string
    const router = useRouter();
    const searchParams = useSearchParams();
    const clientId = searchParams.get('clientId'); // Ensure clientId is retrieved

    const [Subject, setSubject] = useState('');
    const [Level, setLevel] = useState('');
  //Client ID //Get from clientID
    //Client Will be handled by server
    //tutorId Will be handled by acceptedAssignment
    //Tutor  
    const [description, setDescription] = useState('');
    const [tuteeLocation, setLocation] = useState('');
 //  const [TimeAvailable, setTimeAvailable] = useState<number>(-1); //TODO Next Time
    const [MinRate, setMinRate] = useState<number>(-1);
    const [MaxRate, setMaxRate] = useState<number>(-1);
    const [error, setError] = useState<string | null>(null);

//TODO: Create inputs, change onSubmit
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postDate = Date.now();

        try {
            const res = await fetch('/api/postAssignments', {
                method: 'POST',
                body: JSON.stringify({
                    Subject,
                    Level, 
                    clientId,
                    tuteeLocation, 
                    MinRate, 
                    MaxRate, 
                    description,
                    postDate
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
   //TODO: Change to main page
                router.push("/registerClient"); // Use relative path
            } else {
                setError((await res.json()).error);
            }
        } catch (error: any) {
            setError(error?.message);
        }

        console.log("Assignment posted!");
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="grid gap-4">
                {/* Subject */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="Subject">Subject</Label>
                    <Input 
                        required
                        value={Subject}
                        onChange={(e) => setSubject(e.target.value)}
                        id="Subject" 
                        type="text" 
                    />
                </div>
                {/* Level */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="Level">Level</Label>
                    <Input 
                        required
                        value={Level}
                        onChange={(e) => setLevel(e.target.value)}
                        id="Level" 
                        type="text" 
                    />
                </div>
                {/* Tutee Location */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                        required
                        value={tuteeLocation}
                        onChange={(e) => setLocation(e.target.value)}
                        id="location" 
                        type="text" 
                    />
                </div>
                {/* MinRate */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="MinRate">Min Rate</Label>
                    <Input 
                        required
                        value={MinRate}
                        onChange={(e) => setMinRate(parseFloat(e.target.value))}
                        id="MinRate" 
                        type="number" 
                    />
                </div>
                {/* MaxRate */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="MaxRate">Max Rate</Label>
                    <Input 
                        required
                        value={MaxRate}
                        onChange={(e) => setMaxRate(parseFloat(e.target.value))}
                        id="MaxRate" 
                        type="number" 
                    />
                </div>
                {/* Description */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Input 
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="description" 
                        type="text" 
                    />
                </div>
                {/* Error Message */}
                {error && <div className="text-red-500">{error}</div>}
                {/* Submit Button */}
                <Button type="submit" className="w-full mt-4">Post Assignment</Button>
            </div>
        </form>
    );
}
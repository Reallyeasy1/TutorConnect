"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Assignment {
    id: number;
    subject: string;
    level: string;
    location: string;
    minRate: number;
    maxRate: number;
    description: string;
    postDate: string;
    taken: boolean;
    client: {
        id: number;
        name: string;
    };
    tutor: {
        id: number;
        name: string;
    };
}

export const UpdateAssignmentForm = ({ defaultValues = {} }: { defaultValues?: any }) => {
    const router = useRouter();
    const params = useParams();
    const assignmentid = params.assignmentId.toString();
    const clientId = params.clientId;
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [subject, setSubject] = useState(defaultValues.subject || "");
    const [level, setLevel] = useState(defaultValues.level || "");
    const [location, setLocation] = useState(defaultValues.location || "");
    const [minRate, setMinRate] = useState(defaultValues.minRate || 0);
    const [maxRate, setMaxRate] = useState(defaultValues.maxRate || 0);
    const [description, setDescription] = useState(defaultValues.description || "");

    useEffect(() => {
        async function fetchAssignments() {
            try {
                const res = await fetch("/api/assignments");
                const contentType = res.headers.get("content-type");
                if (!res.ok) {
                    const errorData = await res.json();
                    setError(errorData.error || "Failed to fetch assignments");
                    return;
                }

                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    setAssignments(data);

                    const assignment = data.find((a: Assignment) => a.id === parseInt(assignmentid));
                    if (assignment) {
                        setSubject(assignment.subject);
                        setLevel(assignment.level);
                        setLocation(assignment.location);
                        setMinRate(assignment.minRate);
                        setMaxRate(assignment.maxRate);
                        setDescription(assignment.description);
                    }
                } else {
                    setError("Unexpected content type: " + contentType);
                }
            } catch (err: any) {
                setError(err.message);
            }
        }

        fetchAssignments();
    }, [assignmentid]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

     const onDelete = async () => {
    try {
        const res = await fetch(`/api/client/deleteAssignment?id=${assignmentid}`, {
            method: "DELETE",
        });

        if (res.ok) {
            router.push(`/client/${clientId}/assignment/client_assignment`); // Use relative path
        } else {
            setError((await res.json()).error);
        }
    } catch (error: any) {
        setError(error?.message);
    }
};
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postDate = Date.now();

        try {
            const res = await fetch(`/api/client/updateAssignment`, {
                method: "PUT",
                body: JSON.stringify({
                    assignmentid,
                    subject,
                    level,
                    clientId,
                    location,
                    minRate,
                    maxRate,
                    description,
                    postDate,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                router.push(`/client/${clientId}/assignment/client_assignment`); // Use relative path
            } else {
                setError((await res.json()).error);
            }
        } catch (error: any) {
            setError(error?.message);
        }

        console.log("Assignment updated!");
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="grid gap-4">
                {/* Subject */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        id="subject"
                        type="text"
                    />
                </div>
                {/* Level */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="level">Level</Label>
                    <Input
                        required
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        id="level"
                        type="text"
                    />
                </div>
                {/* Location */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        id="location"
                        type="text"
                    />
                </div>
                {/* Min Rate */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="minRate">Min Rate</Label>
                    <Input
                        required
                        value={minRate}
                        onChange={(e) => setMinRate(parseFloat(e.target.value))}
                        id="minRate"
                        type="number"
                    />
                </div>
                {/* Max Rate */}
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="maxRate">Max Rate</Label>
                    <Input
                        required
                        value={maxRate}
                        onChange={(e) => setMaxRate(parseFloat(e.target.value))}
                        id="maxRate"
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
                <Button type="submit" className="w-full mt-4" style={{ backgroundColor: "#000", color: "#fff" }}>
                    Save
                </Button> 
                {/* Delete Button */}
                <Button type="button" className="w-full mt-4" style={{ backgroundColor: "#ff0000", color: "#fff" }} onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </form>
        
    );
};
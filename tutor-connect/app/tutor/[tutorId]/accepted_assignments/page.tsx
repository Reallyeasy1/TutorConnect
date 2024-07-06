//TODO: Change the assignments format to the one from github
//TODO: Add filter function here

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";


interface Assignment {
    id: number;
    subject: string;
    level: string;
    address: string;
    minRate: number;
    maxRate: number;
    description: string;
    postDate: string;
    taken: boolean;
    client: {
        id: number;
        name: string;
    };
}

const AssignmentRow = ({ assignments }: { assignments: Assignment[] }) => {
     const router = useRouter();
    const params = useParams();
    const tutorId = params.tutorId;
    return (
        <div className="grid grid-cols-3 gap-4 p-6">
            {assignments.map((assignment) => (
                <div
                    key={assignment.id}
                    className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between relative"
                >
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">
                            {assignment.subject} - {assignment.level}
                        </h2>
                        <p className="text-gray-700 mb-1">
                            <strong>Location:</strong> {assignment.address}
                        </p>
                        <p className="text-gray-700 mb-1">
                            <strong>Rate:</strong> ${assignment.minRate} - ${assignment.maxRate}
                        </p>
                        <p className="text-gray-700 mb-1">
                            <strong>Description:</strong> {assignment.description}
                        </p>
                        <p className="text-gray-700 mb-1">
                            <strong>Post Date:</strong> {new Date(assignment.postDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 mb-1">
                            <strong>Client:</strong> {assignment.client.name}
                        </p>
                        <p className={`text-gray-700 mb-1 ${assignment.taken ? "text-red-500" : "text-green-500"}`}>
                            <strong>Status:</strong> {assignment.taken ? "Taken" : "Available"}
                        </p>
                    </div>
                    <button
                        className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                        onClick={() => (window.location.href = `/tutor/${tutorId}/accepted_assignments/${assignment.id}`)}
                    >
                        View Assignment
                    </button>
                </div>
            ))}
        </div>
    );
};

export default function AppliedAssignments() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();
    const tutorId = params.tutorId;

    useEffect(() => {
        async function fetchAssignments() {
            try {
                const res = await fetch(`/api/tutor/${tutorId}/acceptedAssignments`);
                const contentType = res.headers.get("content-type");
                if (!res.ok) {
                    const errorData = await res.json();
                    setError(errorData.error || "Failed to fetch assignments");
                    return;
                }

                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    setAssignments(data.acceptedAssignments);
                } else {
                    setError("Unexpected content type: " + contentType);
                }
            } catch (err: any) {
                setError(err.message);
            }
        }

        fetchAssignments();
    }, [tutorId]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    const groupedAssignments = [];
    for (let i = 0; i < assignments.length; i += 3) {
        groupedAssignments.push(assignments.slice(i, i + 3));
    }

    console.log(groupedAssignments);
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow grid grid-cols-3 gap-8" style={{ height: 'calc(100vh - 100px)' }}>
                <div className="col-span-2 p-6 overflow-auto">
                    {groupedAssignments.length === 0 ? (
                        <p className="text-gray-500 text-center">
                            No assignments available.
                        </p>
                    ) : (
                        groupedAssignments.map((group, index) => (
                            <AssignmentRow key={index} assignments={group} />
                        ))
                    )}
                </div>
                <div className="col-span-1 h-full p-6">
                    <div className="h-full bg-gray-300">
                        <p className="flex items-center justify-center h-full">Map Placeholder</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
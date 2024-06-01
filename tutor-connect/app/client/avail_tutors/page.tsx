//TODO:Change to avail tutors
//TODO: Add location to Tutor
  //TODO: Redirect routing to change to main page
// router.push("/assignments"); // Use relative path
//TODO: Change to tutor/applyAssignment

'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert } from "@/components/ui/alert";

interface Tutor {
  id: number;
  email: string;
  password: string;
  name: string;
  contactNumber: number;
  dateOfBirth: string;
  gender: string;
  age: number;
  nationality: string;
  race: string;
  typeOfTutor: string;
  yearsOfExperience: number;
  highestEducationLevel: string;
  location: string; // Added location field
}

export default function AvailTutors() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get('assignmentId');
  const clientId = searchParams.get('clientId');
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);

  async function acceptTutor(tutor: Tutor) {
    try {
      if (!clientId) {
        setError2('Client ID is required');
        return;
      }

      const res = await fetch('/api/client/accept_tutor', {
        method: 'PUT',
        body: JSON.stringify({
          clientId,
          AssignmentId: assignmentId,
          tutor
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        alert("Successfully accepted the tutor!");
        router.push(`/tutor/view_assignments?clientId=${clientId}`);
      } else {
        const resData = await res.json();
        setError(resData.error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  }

  useEffect(() => {
    async function getTutors() {
      try {
        const res = await fetch('/api/client/avail_tutors'); // Ensure this matches your route
        const contentType = res.headers.get('content-type');
        
        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.error || 'Failed to fetch tutors');
          return;
        }

        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          setTutors(data.avail_tutors);
        } else {
          setError('Unexpected content type: ' + contentType);
        }
      } catch (err: any) {
        setError(err.message);
      }
    }

    getTutors();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center">Available Tutors</h1>
      {tutors.length === 0 ? (
        <p className="text-gray-500 text-center">No tutors available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {tutors.map((tutor) => (
            <div key={tutor.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full max-w-6xl">
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Tutor Information</h3>
                <p className="text-gray-700 mb-1"><strong>Name:</strong> {tutor.name}</p>
                <p className="text-gray-700 mb-1"><strong>Contact Number:</strong> {tutor.contactNumber}</p>
                <p className="text-gray-700 mb-1"><strong>Date of Birth:</strong> {new Date(tutor.dateOfBirth).toLocaleDateString()}</p>
                <p className="text-gray-700 mb-1"><strong>Gender:</strong> {tutor.gender}</p>
                <p className="text-gray-700 mb-1"><strong>Age:</strong> {tutor.age}</p>
                <p className="text-gray-700 mb-1"><strong>Nationality:</strong> {tutor.nationality}</p>
                <p className="text-gray-700 mb-1"><strong>Race:</strong> {tutor.race}</p>
                <p className="text-gray-700 mb-1"><strong>Type of Tutor:</strong> {tutor.typeOfTutor}</p>
                <p className="text-gray-700 mb-1"><strong>Years of Experience:</strong> {tutor.yearsOfExperience}</p>
                <p className="text-gray-700 mb-1"><strong>Highest Education Level:</strong> {tutor.highestEducationLevel}</p>
                {/* <p className="text-gray-700 mb-1"><strong>Location:</strong> {tutor.location}</p> Display location */}
              </div>
              <button
                className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                onClick={() => acceptTutor(tutor)}
              >
                Accept Tutor
              </button>
              {error2 && <Alert>{error2}</Alert>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

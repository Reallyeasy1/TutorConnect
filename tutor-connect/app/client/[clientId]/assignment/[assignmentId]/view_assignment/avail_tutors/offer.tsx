"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Assignment } from "@prisma/client";

type Tutor = {
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
};

interface OfferFormProps {
  assignmentId: string | string[];
  tutor: Tutor;
  clientId: string | string[];
}

export const OfferForm: FC<OfferFormProps> = ({
  assignmentId,
  tutor,
  clientId,
}) => {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [availability, setAvailability] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const assignmentResponse = await fetch("/api/getAssignment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ assignmentId }),
        });

        if (!assignmentResponse.ok) {
          throw new Error("Failed to fetch assignment details");
        }
        const assignmentData = await assignmentResponse.json();
        setAssignment(assignmentData.assignments);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAssignment();
  }, [assignmentId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (availability === "") {
      setError("Please enter availability");
      return;
    }

    if (amount === 0 || amount > 500) {
      setError("Please enter a valid amount");
      return;
    }
    
    try {
      const res = await fetch("/api/client/offer_tutor", {
        method: "PUT",
        body: JSON.stringify({
          clientId,
          assignmentId,
          tutor,
          startDate: availability,
          amount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const pickedNotification = await fetch(
        "/api/tutor/notifications/pickedNotification",
        {
          method: "POST",
          body: JSON.stringify({
            clientId,
            tutorId: tutor.id,
            assignmentId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok && pickedNotification.ok) {
        alert("Offer sent to tutor");
        router.push(`/client/${clientId}/assignment/client_assignment`);
      } else {
        const resData = await res.json();
        setError(resData.error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
    console.log("Request sent!");
  };

  const styles = {
    blueButton: {
      backgroundColor: "#5790AB",
      color: "#fff",
      font: "Poppins",
      fontWeight: "bold",
      fontSize: "16px",
      width: "100%",
      gridColumn: "span 1",
      marginTop: "10px",
    },
    text: {
      font: "Poppins",
      fontWeight: "bold",
      fontSize: "16px",
      width: "100%",
      marginTop: "10px",
    },
    header: {
      font: "Poppins",
      fontWeight: "bold",
      fontSize: "18px",
      width: "100%",
      marginTop: "10px",
    },
    title: {
      font: "Poppins",
      fontWeight: "bold",
      fontSize: "22px",
      width: "100%",
      marginTop: "10px",
    },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button style={styles.blueButton}>Make Offer</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle style={styles.title}>Offer Details</DialogTitle>
            <DialogDescription>
              Fill in the details below to place an offer for this tutor.
            </DialogDescription>
          </DialogHeader>
          {assignment && (
            <>
              <div className="space-y-2">
                <p className="text-gray-700 mb-1 mt-4" style={styles.header}>
                  {assignment.level} {assignment.subject}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Address:</strong> {assignment.address}, Singapore{" "}
                  {assignment.postalCode}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Duration:</strong> {assignment.duration}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Frequency:</strong> {assignment.frequency}
                </p>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="availability" style={styles.text}>
                    Earliest Availability
                  </Label>
                  <Input
                    required
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    id="availability"
                    type="text"
                    placeholder="Example: Start next week/month, flexible"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="amount" style={styles.text}>
                    Offered Rate
                  </Label>
                  <Input
                    required
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    id="amount"
                    type="number"
                  />
                </div>
              </div>
            </>
          )}
          {error && <div className="text-red-500">{error}</div>}
          <DialogFooter>
            <Button style={styles.blueButton}>Send Offer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

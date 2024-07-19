"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ContactUsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length === 0) {
      setError("Name cannot be empty");
      return;
    }

    if (email.length === 0) {
      setError("Email cannot be empty");
      return;
    }

    if (subject.length === 0) {
      setError("Subject cannot be empty");
      return;
    }

    try {
      const res = await fetch("/api/contactUs", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          subject,
          message
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const result = await res.json();
        alert(`Email sent successfully! Issue ID: ${result.issueId}`);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        const errorResult = await res.json();
        setError(errorResult.error);
        alert(`Error: ${errorResult.error}`);
      }

    } catch (error: any) {
      setError(error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6 w-full p-8">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              id="subject"
              type="text"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              className="mt-1"
              rows={4}
            />
          </div>
        </div>
        {error && <Alert>{error}</Alert>}
        <div>
          <Button className="w-full" size="lg" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

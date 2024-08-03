"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatRoom from "@/components/ChatRoom/index";

export default function Chat() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const clientId = parseInt(params.clientId.toString(),10); // Getting the clientId from the URL
  const tutorName = searchParams.get("tutorName")
  const tutorId = searchParams.get("tutorId")
  const [done, setDone] = useState("");
  const [username, setUsername] = useState("");
  let tutorIdInt = null;
  let curr_recipient_inp = null;
 
  if (tutorId != null) {
    tutorIdInt = parseInt(tutorId, 10);
    curr_recipient_inp = {username: tutorName, id: tutorIdInt};
  }  

  useEffect(() => {
    async function getDetails() {
      try {
        const response = await fetch(`/api/client/getDetails?clientId=${clientId}`);
        const data = await response.json();
        console.log(data); // Logging out the Payload.
        setUsername(data.name); // Setting the username
        setDone("done"); // Granting access to the chat page
      } catch (error) {
        console.log(error);
        router.push("/"); // Redirecting the user to the home page if an error occurred
      }
    }
    getDetails();
  }, [clientId, router]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      {done !== "done" ? ( // Waiting for access to be granted
        <h1>Verifying token..... Please wait</h1>
      ) : (<div>
        <ChatRoom username={username} id = {clientId} isTutor = {false} curr_recipient = {curr_recipient_inp}/>
        </div>
        
      )}
    </div>
  );
}

"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatRoom from "@/components/ChatRoom/index";
import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";

export default function Chat() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const tutorId = params.tutorId; // Getting the clientId from the URL
  const clientName = searchParams.get("clientName")
  const clientId = searchParams.get("clientId")
  const [done, setDone] = useState("");
  const [username, setUsername] = useState("");
  let clientIdInt = null;
  let curr_recipient_inp = null;

  if (clientId != null) {
    clientIdInt = parseInt(clientId, 10);
    curr_recipient_inp = {username: clientName, id: clientIdInt};
  }  

  useEffect(() => {
    async function getDetails() {
      try {
        //Change this URL to /api/tutor/getDetails?tutorId=${tutorId}
        const response = await fetch(`/api/tutor/getDetails?tutorId=${tutorId}`);
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
  }, [tutorId, router]);

  return (
    <div>
      {done !== "done" ? ( // Waiting for access to be granted
        <h1>Verifying token..... Please wait</h1>
      ) : (<div>
      <NavBar />
        <ChatRoom username={username} id = {tutorId} isTutor = {true} curr_recipient = {curr_recipient_inp}/>
        {/* <Footer /> */}
        </div>
        
      )}
    </div>
  );
}

"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatRoom from "@/components/ChatRoom/index";
import NavBar from "@/components/nav-bar/navBar";
import Footer from "@/components/footer/footer";

export default function Chat() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.clientId; // Getting the clientId from the URL
  const [done, setDone] = useState("");
  const [username, setUsername] = useState("");

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
    <div>
      {done !== "done" ? ( // Waiting for access to be granted
        <h1>Verifying token..... Please wait</h1>
      ) : (<div>
      <NavBar />
        <ChatRoom username={username} id = {clientId} tutor = {false}/>
        </div>
        
      )}
    </div>
  );
}
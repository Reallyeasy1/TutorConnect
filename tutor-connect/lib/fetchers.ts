import { userProps } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Handle form submission for user authentication
export async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  router: ReturnType<typeof useRouter>,
  avatarId: string,
  socket: any
) {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  
  // Casting to HTMLInputElement to access the value property
  const name = (target[0] as HTMLInputElement).value;
  const email = (target[1] as HTMLInputElement).value;
  
  console.log(email);

  try {
    await fetch("/auth", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        imageId: `https://robohash.org/${avatarId}.png`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    socket.emit("joined", "new user");
    router.push("/chat");
  } catch (err) {
    console.log(err);
  }
}

// Fetch user data using a provided cookie and setUser function
export async function fetchUser(
  cookie: { user?: any },
  setUser: (user: any) => void
) {
  const accessToken = cookie.user;

  try {
    const response = await fetch("/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = await response.json();
    setUser(user[0]);
  } catch (err) {
    console.log(err);
  }
}

// Fetch users excluding the current user and set them
export async function fetchUsers(
  mySelf: userProps,
  setUsers: (users: userProps[]) => void
) {
  try {
    const response = await fetch("/users");
    const myUsers = await response.json();
    setUsers(myUsers.filter((user: userProps) => user.email !== mySelf?.email));
  } catch (err) {
    console.log(err);
  }
}

// Fetch messages between sender and receiver and set them
export async function fetchMessages(
  sender: userProps,
  receiver: userProps,
  setMessages: (messages: any) => void
) {
  if (sender && receiver) {
    try {
      const response = await fetch(
        `/messages?sender=${sender?.email}&receiver=${receiver?.email}`
      );
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.log(err);
      setMessages(null);
    }
  }
}
'use client'
import React, { useEffect, useState, useRef } from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "../Header";
import Messages from "../Messages";
import List from "../List";
import { ChatContainer, StyledContainer, ChatBox, StyledButton, SendIcon, InputContainer, StyledInput } from "./styles";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

interface ChatRoomProps {
  username: string;
  id: string;
}

interface Message {
  user: string;
  message: string;
  createdAt: string;
}

interface UserAttributes {
  username: string;
}

interface User {
  id: number;
  attributes: UserAttributes;
}

// Now make it such that the List component, when clicked on, sets the recipient as that current recipient
// It then filters the list of messages to only show messages between the current user and that recipient
const ChatRoom: React.FC<ChatRoomProps> = ({ username, id }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const socket = useRef(io("http://localhost:1337")).current;
  // Create setRecipient here

  useEffect(() => {
    socket.emit("join", { username, id }, (error: string) => {
      if (error) return alert(error);
    });

    socket.on("welcome", async (data: { user: string; text: string }, error: string) => {
      if (error) return alert(error);
      const welcomeMessage: Message = {
        user: data.user,
        message: data.text,
        createdAt: new Date().toISOString(),
      };
      // setMessages([welcomeMessage]);

      setMessages([]);
      try {
        const res = await fetch("http://localhost:1337/api/messages");
        const response = await res.json();
        // let arr: Message[] = [welcomeMessage];
         let arr: Message[] = [];
        response.data.forEach((one: { attributes: Message }) => {
          arr = [...arr, one.attributes];
        });
        setMessages(arr);
      } catch (e) {
        console.log(e.message);
      }
    });

async function loadUsers(){
     try {
        const res = await fetch("http://localhost:1337/api/accounts");
        const usersData = await res.json();
        console.log("Users response: ", usersData);
        setUsers(usersData.data); // Ensure setting the correct part of the response
      } catch (e) {
        console.log(e.message);
      }

}

loadUsers()
    socket.on("roomData", async (data) => {
      try {
        const res = await fetch("http://localhost:1337/api/accounts");
        const usersData = await res.json();
        console.log("Users response: ", usersData);
        setUsers(usersData.data); // Ensure setting the correct part of the response
      } catch (e) {
        console.log(e.message);
      }
    });

    socket.on("message", (data: { user: string; text: string; createdAt: string }) => {
      const newMessage: Message = {
        user: data.user,
        message: data.text,
        createdAt: data.createdAt,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("users", (data: { users: { username: string }[] }) => {
      setUsers(data.users);
    });

    return () => {
      socket.off("welcome");
      socket.off("roomData");
      socket.off("message");
      socket.off("users");
    };
  }, [username, socket]);

  const sendMessage = (message: string) => {
    if (message) {
      const newMessage: Message = {
        user: username,
        message,
        createdAt: new Date().toISOString(), // Add current timestamp
      };
      
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("sendMessage", { message, user: username, createdAt: newMessage.createdAt }, (error: string) => {
        if (error) {
          alert(error);
        }
      });
      setMessage("");
    } else {
      alert("Message can't be empty");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    sendMessage(message);
  };


// console.log(users)
// console.log("hello")  
return (
    <ChatContainer>
      <Header room="Chat" />
      <StyledContainer>
        <List users={users} username={username} />
        <ChatBox>
          <Messages messages={messages} username={username} />
          <InputContainer>
            <StyledInput
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={handleChange}
            />
            <StyledButton onClick={handleClick}>
              <SendIcon>
                <i className="fa fa-paper-plane" />
              </SendIcon>
            </StyledButton>
          </InputContainer>
        </ChatBox>
      </StyledContainer>
    </ChatContainer>
  );
};

export default ChatRoom;


  //TODO: Bug, after messaging, the name of the message may not appear
      //TODO: Bug 2, will not show newer messages sometimes, takes too long to load, may consider reloading/ lazy evaluation
      //TODO: Also fix active users as well/ classify them into rooms
      //TODO: Add polling so the name gets generated, etc.
      //TODO: Add timestamp as well
      //TODO: Refresh the page after 30s
      //TODO: Add scroll down bar if reach maximum height of room/ number of messages
   
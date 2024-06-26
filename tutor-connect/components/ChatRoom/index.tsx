import React, { useEffect, useState, useRef } from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "../Header";
import Messages from "../Messages";
import List from "../List";
import { ChatContainer, StyledContainer, ChatBox, StyledButton, SendIcon, InputContainer, StyledInput } from "./styles";
import { io } from "socket.io-client";

interface ChatRoomProps {
  username: string;
  id: string;
  tutor: boolean;
  curr_recipient: {
    username: string | null;
    id: number | null;
  } | null;
}

interface Message {
  user: string;
  message: string;
  createdAt: string;
  recipient: string;
}

interface UserAttributes {
  username: string;
}

interface User {
  id: number;
  attributes: UserAttributes;
  isTutor: boolean;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ username, id, isTutor, curr_recipient }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [recipient, setRecipient] = useState<string | null>(null);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const socket = useRef(io("http://localhost:1337")).current;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage(message);
    }
  };

  const fetchAllMessages = async () => {
    let allMessages: Message[] = [];
    let page = 1;
    let pageSize = 100; // Adjust page size if necessary

    while (true) {
      const res = await fetch(`http://188.166.213.34/api/messages?pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
      const response = await res.json();
      const newMessages = response.data.map((one: { attributes: Message }) => one.attributes);
      allMessages = [...allMessages, ...newMessages];
      
      if (newMessages.length < pageSize) {
        break; // Exit loop if there are no more messages
      }

      page += 1;
    }

    setMessages(allMessages);
  };

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
        recipient: recipient || ""
      };

      setMessages([]);
      try {
        await fetchAllMessages();
      } catch (e) {
        console.log(e.message);
      }
    });

    async function loadUsers() {
      try {
        const res = await fetch("http://localhost:1337/api/accounts");
        const usersData = await res.json();
        console.log(usersData);
        const transformedUsers: User[] = usersData.data.map((user: any) => ({
          id: user.id,
          attributes: user.attributes,
          isTutor: user.attributes.isTutor
        })).filter((user: User) => user.isTutor == !isTutor);

        setUsers(transformedUsers);
      } catch (e) {
        console.log(e.message);
      }
    }

    loadUsers();

    socket.on("roomData", async () => {
      loadUsers();
    });

    socket.on("message", (data: { user: string; text: string; createdAt: string; recipient: string }) => {
      const newMessage: Message = {
        user: data.user,
        message: data.text,
        createdAt: data.createdAt,
        recipient: data.recipient
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
  }, [username, id]);

  useEffect(() => {
    if (curr_recipient) {
      setRecipient(curr_recipient.username);
      //TODO: Need to change the list section to be highlighted
    }
 
    const filtered = recipient
      ? messages.filter(
          (msg) =>
            (msg.user === username && msg.recipient === recipient) ||
            (msg.user === recipient && msg.recipient === username)
        )
      : [];
    setFilteredMessages(filtered);
  }, [recipient, messages, username]);

  const sendMessage = (message: string) => {
    if (!recipient) {
      alert("Please select a recipient before sending a message.");
      return;
    }

    if (message) {
      const newMessage: Message = {
        user: username,
        message,
        createdAt: new Date().toISOString(),
        recipient: recipient
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("sendMessage", { message, user: username, createdAt: newMessage.createdAt, recipient: recipient }, (error: string) => {
        if (error) {
          alert(error);
        }
      });
      setMessage("");
    } 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    sendMessage(message);
  };

  return (
    <ChatContainer>
      <Header room="Chat" id={id} tutor = {isTutor}/>
      <StyledContainer>
        <List users={users} username={username} onUserClick={setRecipient} curr_recipient = {curr_recipient} />
        <ChatBox>
          {recipient ? (
            <>
              <Messages messages={filteredMessages} username={username} />
              <InputContainer>
                <StyledInput
                  type="text"
                  placeholder="Type your message"
                  value={message}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
                <StyledButton onClick={handleClick}>
                  <SendIcon>
                    <i className="fa fa-paper-plane" />
                  </SendIcon>
                </StyledButton>
              </InputContainer>
            </>
          ) : (
            <div>Please select a user to start chatting.</div>
          )}
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
   
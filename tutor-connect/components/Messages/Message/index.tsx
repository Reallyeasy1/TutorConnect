import React from "react";
import { MessagesContainer, MessageBox, MessageText, SentBy } from "./styles";

interface MessageProps {
  username: string;
  message: {
    user: string;
    message: string;
    createdAt: string;
  };
}

const Message: React.FC<MessageProps> = ({ username, message }) => {
  const sentByCurrentUser = message.user === username;
  const formattedDate = new Date(message.createdAt).toLocaleString(); // Format the date and time

  return (
    <MessagesContainer textPosition={sentByCurrentUser ? "end" : "start"}>
      <MessageBox background={sentByCurrentUser ? "blue" : "default"}>
        <MessageText color={sentByCurrentUser ? "white" : "default"}>
          {message.message}
        </MessageText>
        <SentBy right={sentByCurrentUser ? 1 : 0}>
          {message.user} - {formattedDate} {/* Display the formatted date and time */}
        </SentBy>
      </MessageBox>
    </MessagesContainer>
  );
};

export default Message;

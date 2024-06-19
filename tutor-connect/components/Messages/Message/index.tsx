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

  return (
    <MessagesContainer textPosition={sentByCurrentUser ? "end" : "start"}>
      <MessageBox background={sentByCurrentUser ? "blue" : "default"}>
        <MessageText color={sentByCurrentUser ? "white" : "default"}>
          {message.message}
        </MessageText>
        <SentBy right={sentByCurrentUser ? 1 : 0}>
          {message.user} - {new Date(message.createdAt).toLocaleTimeString()}
        </SentBy>
      </MessageBox>
    </MessagesContainer>
  );
};

export default Message;

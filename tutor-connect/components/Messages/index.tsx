import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "./Message";

interface MessageProps {
  user: string;
  message: string;
  createdAt: string;
}

interface MessagesProps {
  messages: MessageProps[];
  username: string;
}

const Messages: React.FC<MessagesProps> = ({ messages, username }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sortedMessages = [...messages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <StyledMessages>
      {sortedMessages.map((message, i) => (
        <div key={i} ref={i === sortedMessages.length - 1 ? messagesEndRef : null}>
          <Message message={message} username={username} />
        </div>
      ))}
    </StyledMessages>
  );
};

export default Messages;

const StyledMessages = styled.div`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`;


// import React, { useEffect, useRef } from "react";
// import styled from "styled-components";
// import Message from "./Message";

// interface MessagesProps {
//   messages: {
//     user: string;
//     text: string;
//     time: string;
//   }[];
//   username: string;
// }

// const Messages: React.FC<MessagesProps> = ({ messages, username }) => {
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <MessagesContainer>
//       {messages.map((message, i) => (
//         <Message key={i} message={message} username={username} />
//       ))}
//       <div ref={messagesEndRef} />
//     </MessagesContainer>
//   );
// };

// export default Messages;

// const MessagesContainer = styled.div`
//   padding: 20px;
//   overflow-y: auto;
//   flex: 1;
//   background: #e5ddd5;
// `;



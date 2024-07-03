import styled from 'styled-components';
import { Button } from 'antd';

// Main chat container
export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #f2f2f2;
    padding: 20px;
    margin: 20px auto;
    width: 80%; // Adjusted width to fit design
    max-width: 1200px; // Max width to control the container size
    box-shadow: 5px 10px 18px #888888;
    height: 80vh; // Adjusted height to fit design
    border-radius: 10px; // Added border radius for better aesthetics
`;

// Container for the chat messages and input
export const StyledContainer = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
    border-radius: 8px;
    height: 100%; // Adjusted height
    justify-content: space-between;
`;

// Chat box with messages and input
export const ChatBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background: linear-gradient(to bottom, #d4fc79, #96e6a1);  // Gradient background similar to Telegram
    border-radius: 8px;
    padding: 10px;
    overflow-y: auto; // Ensure messages can be scrolled
`;

// Container for the input and send button
export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: auto;
    padding-top: 10px; // Added padding to separate from messages
`;

// Styled input field
export const StyledInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 10px;
    outline: none;
`;

// Styled send button
export const StyledButton = styled(Button)`
    height: 45px;
    background: #2979FF;
    color: #fff;
    border: none;
    transition: 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
        background: #005bbb;
        color: #fff;
    }
    :focus {
        background: #005bbb;
        color: #fff;
    }
`;

// Icon inside the send button
export const SendIcon = styled.div`
    color: #fff;
    font-size: 20px;
    :hover {
        color: #2979FF;
        background: #fff;
    }
    :focus {
        outline: none;
    }
`;

// Container for individual messages
export const MessagesContainer = styled.div<{ textPosition: string }>`
    display: flex;
    padding: 0 5%;
    margin-top: 3px;
    justify-content: ${(props) => (props.textPosition === 'end' ? 'flex-end' : 'flex-start')};
`;

// Box containing the message text
export const MessageBox = styled.div<{ background: string }>`
    background: #F3F3F3;
    border-radius: 10px 10px 10px 0;
    padding: 15px 20px;
    display: inline-block;
    max-width: 80%;
    background: ${(props) => (props.background === 'blue' ? '#dcf8c6' : '#fff')};
    color: ${(props) => (props.background === 'blue' ? '#000' : '#000')};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    margin: 5px 0;
    border: 1px solid #e5e5ea;
`;

// Text inside the message box
export const MessageText = styled.p`
    font-size: 1rem;
    word-wrap: break-word;
    color: ${(props) => (props.color === 'white' ? '#000' : '#000')};
    margin: 0;
`;

// Name of the sender below the message
export const SentBy = styled.p`
    display: flex;
    align-items: center;
    font-family: Helvetica, sans-serif;
    font-size: 0.8rem;
    color: #828282;
    letter-spacing: 0.3px;
    margin: 5px 0 0 0;
    justify-content: flex-start;
`;
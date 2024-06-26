import styled from 'styled-components';

// Define the custom prop types
interface MessagesContainerProps {
    textPosition?: 'start' | 'end';
}

interface MessageBoxProps {
    background?: 'blue' | 'default';
}

interface MessageTextProps {
    color?: 'white' | 'default';
}

interface SentByProps {
    right?: boolean;
}

// Apply the custom prop types to the styled components
export const MessagesContainer = styled.div<MessagesContainerProps>`
    display: flex;
    padding: 0 5%;
    margin-top: 3px;
    justify-content: ${(props) => (props.textPosition === 'end' ? 'flex-end' : 'flex-start')};
`;

export const MessageBox = styled.div<MessageBoxProps>`
    border-radius: 10px 10px 10px 0;
    padding: 10px 15px;
    display: inline-block;
    max-width: 70%;
    background: ${(props) => (props.background === 'blue' ? '#dcf8c6' : '#fff')};
    color: ${(props) => (props.background === 'blue' ? '#000' : '#000')};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    margin: 5px 0;
    border: 1px solid #e5e5ea;
`;

export const MessageText = styled.p<MessageTextProps>`
    font-size: 1rem;
    word-wrap: break-word;
    color: ${(props) => (props.color === 'white' ? '#000' : '#000')};
    margin: 0;
`;

export const SentBy = styled.p<SentByProps>`
    display: flex;
    align-items: center;
    font-family: Helvetica, sans-serif;
    font-size: 0.8rem;
    color: #828282;
    letter-spacing: 0.3px;
    padding: ${(props) => (props.right ? '0 10px 0 0' : '0 0 0 10px')};
    margin: 5px 0 0 0;
`;

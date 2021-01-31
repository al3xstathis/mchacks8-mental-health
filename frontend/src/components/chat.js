import React, {useRef, useState} from 'react';
import {motion} from 'framer-motion';
import './chat.css';

const Chat = () => {
    const [typingText, setTypingText] = useState("");
    const [chatArray, setChatArray] = useState(
        [
            {
                message: "Send a message to start the conversation...",
                incoming: true
            },
            {
                message: "Ask a question...",
                incoming: false
            }
        ]
    );

    const bottomRef = useRef();

    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const typedText = typingText.toString()

        if(typedText!=="") {
            setChatArray(
                chatArray.concat({
                    message: typedText,
                    incoming: false
                }));

            setTypingText("");
            scrollToBottom();
        }
    };

    const listOfMessages = chatArray.map((message, index) =>
        <div key={index} className={message.incoming ? "chat-item-flex-left" : "chat-item-flex-right"}>
            {/*Todo replace with actual sender and receiver usernames**/}
            <p className="sender-receiver">{message.incoming ? "Incoming" : "Outgoing"}</p>
            <div className={message.incoming ? "chat-incoming" : "chat-outgoing"}>
                {message.message}
            </div>
        </div>
    )


    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="chat-container">
                <div className="chat-inner">
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="chat-feed">
                        <div className="list-container">
                            {listOfMessages}
                            <div ref={bottomRef}></div>
                        </div>
                    </motion.div>
                    <form
                        onSubmit={handleSubmit}
                        className="chat-input-container">
                        <motion.input
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.8}}
                            type="text"
                            value={typingText}
                            onChange={e => setTypingText(e.target.value)}
                            placeholder="Type your message here:" className="chat-input-box"/>
                        <motion.button
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.8}}
                            whileTap={{scale: 1.7}}
                            className="send-message">SEND</motion.button>
                    </form>

                </div>

            </motion.div>
        </>
    )
}
const ChatFeed = (props) => {
    const messages = props.chatArray;
    const bottomRef = useRef();

    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    const listOfMessages = messages.map((message, index) =>
        <div key={index} className={message.incoming ? "chat-item-flex-left" : "chat-item-flex-right"}>
            {/*Todo replace with actual sender and receiver usernames**/}
            <p className="sender-receiver">{message.incoming ? "Incoming" : "Outgoing"}</p>
            <div className={message.incoming ? "chat-incoming" : "chat-outgoing"}>
                {message.message}
            </div>
        </div>
    )
    return (
        <div className="list-container">
            {listOfMessages}
            <div ref={bottomRef}></div>
        </div>
    )
}

export default Chat;

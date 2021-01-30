import React, {useState} from 'react';
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
    const handleSubmit = e => {
        e.preventDefault();
        const typedText = typingText.toString()

        setChatArray(
            chatArray.concat({
                message: typedText,
                incoming: false
            }));

        setTypingText("");


        console.log("Message sent");
    };


    return (
        <>
            <div className="chat-container">
                <div className="chat-inner">
                    <div className="chat-feed">
                        <ChatFeed chatArray={chatArray}/>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="chat-input-container">
                        <input
                            type="text"
                            value={typingText}
                            onChange={e => setTypingText(e.target.value)}
                            // onKeyPress={handleUserKeyPress}
                            placeholder="Type your message here:" className="chat-input-box"/>
                        <button className="send-message">SEND</button>
                    </form>

                </div>

            </div>
        </>
    )
}
const ChatFeed = (props) => {
    const messages = props.chatArray;
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
        </div>
    )
}

export default Chat;

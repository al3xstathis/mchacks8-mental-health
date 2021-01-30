import React from 'react';
import './video-chat.css';
import Navbar from "../components/nav";
import Chat from "../components/chat";

const Video = () => {
    return (
        <>
            <Navbar/>
            <div className="video-chat">
                <div className="video-feed">
                    <div className="incoming-vid">

                    </div>
                    <div className="selfie-vid">

                    </div>
                </div>
                <div className="chat-game-feed">
                    <Chat/>
                </div>
            </div>
        </>
    )
}
export default Video;

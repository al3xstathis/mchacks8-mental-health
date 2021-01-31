import React from 'react';
import './video-chat.css';
import Chat from "../components/chat";
import {motion} from 'framer-motion'

const Video = () => {
    return (
        <>
            <div className="video-chat">
                <div className="video-feed">
                    <motion.div
                        initial={{opacity: 0,x: -100}}
                        animate={{opacity: 1,x: 0}}
                        transition={{duration:0.5}}
                        className="incoming-vid">
                        <video autoPlay className="remote-video" id="remote-video"></video>

                    </motion.div>
                    <motion.div
                        initial={{opacity: 0,x: 100}}
                        animate={{opacity: 1,x: 0}}
                        transition={{duration:0.5}}
                        className="selfie-vid">
                        <video autoPlay muted className="local-video" id="local-video"></video>
                    </motion.div>
                </div>
                <div className="chat-game-feed">
                    <Chat/>
                </div>
            </div>
        </>
    )
}
export default Video;

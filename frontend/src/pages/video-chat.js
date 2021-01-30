import React from 'react';
import './video-chat.css';
import Navbar from "../components/nav";
import Chat from "../components/chat";
import {motion} from 'framer-motion'

const Video = () => {
    return (
        <>
            <Navbar/>
            <div className="video-chat">
                <div className="video-feed">
                    <motion.div
                        initial={{opacity: 0,x: -100}}
                        animate={{opacity: 1,x: 0}}
                        transition={{duration:0.5}}
                        className="incoming-vid">

                    </motion.div>
                    <motion.div
                        initial={{opacity: 0,x: 100}}
                        animate={{opacity: 1,x: 0}}
                        transition={{duration:0.5}}
                        className="selfie-vid">

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

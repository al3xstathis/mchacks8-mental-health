import React, {useState} from 'react';
import './video-chat.css';
import Navbar from "../components/nav";
import Chat from "../components/chat";
import {motion} from 'framer-motion'

const Video = () => {
    const [iceBreaker, setIceBreaker] = useState("Click this button to shuffle through a list of questions you could ask!");

    const shuffleCards = () => {
        const random = Math.floor(iceBreakers.length * Math.random());
        setIceBreaker(iceBreakers[random]);
        iceBreakers.splice(random);
    }

    const iceBreakers = [
        "What do you most connect with? Why?",
        "What are you committed to?",
        "How different would your life be if there weren’t any criticism in the world?",
        "What are you avoiding?",
        "If joy became the national currency, what kind of work would make you wealthy?",
        "Would you rather have less work to do or more work you enjoy doing?",
        "How do you manage stress?",
        "What do you believe stands between you and complete happiness?",
        "Are you afraid to speak your own opinion?",
        "If you could fix one world problem, what would it be?",
        "What is your life story?",
        "How do you deal with your mental health issues?"
    ]


    return (
        <>
            <Navbar/>
            <div className="video-chat">
                <div className="video-feed">
                    <motion.div
                        initial={{opacity: 0, x: -100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        className="incoming-vid">
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, x: 100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        className="selfie-vid">
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, x: 100}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        className="text-popup">
                        <p className="ice-breaker">{iceBreaker}</p>
                        <motion.button
                            onClick={() => shuffleCards()}
                            whileTap={{scale: 1.7}}
                            className="shuffle">Shuffle</motion.button>
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

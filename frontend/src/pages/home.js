import React, { useEffect, useContext, useState } from 'react';
import Navbar from "../components/nav";
import {handleIncomingMessage} from '../scripts/websocket';
import Loading from "../components/loading";
import './home.css'
import { motion } from "framer-motion";
import { AuthContext } from "../Auth";
import Video from "./video-chat";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        if (!currentUser){
            return;
        }

        let protocol = "ws";
        if (document.location.protocol === "https:") {
            protocol += "s";
        }

        const ws = new WebSocket(protocol + "://localhost:3030/ws");

        ws.onerror = (evt) => {
            setShowVideo(false);
            window.peerConnection = false;
            window.targetUser = false;
            console.error(evt);
        }
        ws.onclose = () => {
            setShowVideo(false);
            window.peerConnection = false;
            window.targetUser = false;
            console.log('Connection closed.');
        }
        
        ws.onopen = () => {
            console.log('Connected!');
            ws.send(JSON.stringify({
                type: 'enqueue',
                user: {
                    uid: currentUser.uid,
                    username: "nic",
                    keywords: ["riperoni", "jabronis", "lorem"]
                },
            }));
        };

        ws.onmessage = (evt) => {
            handleIncomingMessage(ws, JSON.parse(evt.data), currentUser, setShowVideo);
        }

        return () => {ws.close();}
    }, [currentUser]);

    return (
        <>
            <Navbar />
            {showVideo ? <Video/> :
            <div className="home-screen">
                <Loading />
                <div className="home-text">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="home-h2">Based on the categories you chose when creating an account,<br />
                        we are matching you with someone who chose similar categories</motion.h2>
                </div>
            </div>}
        </>
    )
}

export default Home;

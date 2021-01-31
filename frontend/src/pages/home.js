import React, { useEffect, useContext } from 'react';
import Navbar from "../components/nav";
import { connect } from '../scripts/websocket';
import Loading from "../components/loading";
import './home.css'
import { motion } from "framer-motion";
import { AuthContext } from "../Auth";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        console.log(currentUser)
        connect({
            uid: '123456',
            username: 'Nicolas',
            keywords: ['riperoni', 'jabronis', 'lorem', 'ipsum']
        }, true);
    });

    return (
        <>
            <Navbar />
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
            </div>
        </>
    )
}

export default Home;

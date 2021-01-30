import React from 'react';
import Navbar from "../components/nav";
import './landing.css'
import touchingHands from '../assets/touching-hands.png';
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

const Landing = () => {
    return (
        <>
            <Navbar/>
            <div className="landing-container">
                <motion.img
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2, duration: 0.5}}
                    className="image-container" alt="touching-hands" src={touchingHands}/>
                <div className="landing-text">
                    <motion.h2
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.4, duration: 0.5}}
                        className="landing-text-h2">
                        Mental Health Chat was created for individuals who feel alone <br/>
                        to connect with someone who might be feeling the exact same way.<br/><br/>
                        Mental health issues are very common in our society, <br/>
                        but they don't get talked about enough.<br/><br/>
                        This app will let people talk to someone who might be going<br/>
                        through something just like they are.
                    </motion.h2>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.6, duration: 0.5}}
                        className="call-to-action">
                        <motion.h4
                            className="call-to-action-h4">
                            Click here to create an account and get started today!
                        </motion.h4>
                        <Link className="link-to-sign-up" to={'/registration'}>Sign Up</Link>
                    </motion.div>
                </div>

            </div>
        </>
    )
}
export default Landing;

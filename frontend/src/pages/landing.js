import React from 'react';
import Navbar from "../components/nav";
import './landing.css'
import touchingHands from '../assets/touching-hands.png';
import {Link} from "react-router-dom";

const Landing = () => {
    return (
        <>
            <Navbar/>
            <div className="landing-container">
                <img className="image-container" alt="touching-hands" src={touchingHands}/>
                <div className="landing-text">
                    <h2 className="landing-text-h2">
                        Mental Health Chat was created for individuals who feel alone <br/>
                        to connect with someone who might be feeling the exact same way.<br/><br/>
                        Mental health issues are very common in our society, <br/>
                        but they don't get talked about enough.<br/><br/>
                        This app will let people talk to someone who might be going<br/>
                        through something just like they are.
                    </h2>
                    <div className="call-to-action">
                        <h4 className="call-to-action-h4">
                            Click here to create an account and get started today!
                        </h4>
                        <Link className="link-to-sign-up" to={'/registration'}>Sign Up</Link>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Landing;

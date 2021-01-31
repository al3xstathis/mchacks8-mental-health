import React, { useState } from 'react';
import './registration.css';
import Navbar from "../components/nav";
import Select from 'react-select';
import { motion } from "framer-motion";
import { withRouter } from "react-router";
import app from "../firebase";

const Registration = ({ history }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUp, setSignUp] = useState(true);

    const options = [
        { value: 'anxiety', label: 'Anxiety Disorders' },
        { value: 'eating', label: 'Eating Disorder' },
        { value: 'mood', label: 'Mood Disorder' },
        { value: 'personality', label: 'Personality Disorder' },
        { value: 'psychotic', label: 'Psychotic Disorder' },
        { value: 'ptsd', label: 'Post-Traumatic Stress Disorder' },
        { value: 'substance', label: 'Substance Abuse Disorder' },
        { value: 'other', label: 'Other' },
    ];

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSignUp = async () => {
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email, password);
            history.push("/home");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="registration-container">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="sign-up-in">
                    {signUp ?
                        <>
                            <div className="title-sign-up">
                                <h3 className="title-h3">Sign up and create a profile</h3>
                            </div>
                            <div className="username">
                                <p className="input-description">Enter a username: </p>
                                <input className="reg-input" placeholder="Type a username here:" onChange={handleUsernameChange} />
                            </div>
                            <div className="email">
                                <p className="input-description">Enter your email: </p>
                                <input className="reg-input" placeholder="Type your email here:" onChange={handleEmailChange} />
                            </div>
                            <div className="name">
                                <p className="input-description">Enter your name: </p>
                                <input className="reg-input" placeholder="Type your name here:" onChange={handleNameChange} />
                            </div>
                            <div className="password">
                                <p className="input-description">Enter a password: </p>
                                <input type="password" className="reg-input" placeholder="Type your password here:" onChange={handlePasswordChange} />
                            </div>
                            <div className="mental-health-selector">
                                <p className="long-part">Select which mental health issues you
                                identify with so we can match you with others with things
                                in common:
                                </p>
                                <Select
                                    className="mental-select"
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    isMulti
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary: '#BEFBFF',
                                        },
                                    })}
                                />

                            </div>
                            <div className="sign-up-submit">
                                <button className="sign-up-button" onClick={handleSignUp}>SIGN UP</button>
                            </div>
                            <div className="change-sign">
                                <p>Already have an account?</p>
                                <button
                                    onClick={() => setSignUp(false)}
                                    className="change-sign-button">Sign In
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <div className="title-sign-up">
                                <h3 className="title-h3">Sign In</h3>
                            </div>
                            <div className="email">
                                <p className="input-description">Enter your email: </p>
                                <input className="reg-input" placeholder="Type your email here:" />
                            </div>
                            <div className="password">
                                <p className="input-description">Enter a password: </p>
                                <input className="reg-input" placeholder="Type your password here:" />
                            </div>
                            <div className="sign-up-submit">
                                <button className="sign-up-button">SIGN UP</button>
                            </div>
                            <div className="change-sign">
                                <p>Don't have an account?</p>
                                <button
                                    onClick={() => setSignUp(true)}
                                    className="change-sign-button">Sign Up
                                </button>
                            </div>
                        </>
                    }


                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="info">
                    <div className="title-sign-up">
                        <h3 className="title-h3">What is Mental Health Chat?</h3>
                    </div>
                    <div className="description-box">
                        <p className="description-p">
                            Mental Health Chat is a place for people suffering from mental Health Issues
                            to meet and talk to people suffering from similar problems.
                        </p>
                        <br />
                        <p className="description-p">
                            It’s a place to discuss and listen to another
                            person’s experiences and points of views.
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default withRouter(Registration);

import React, { useState } from 'react';
import './registration.css';

const Registration = ({ history }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [health, setHealth] = useState("");


    const options = [
        { value: 'anxietyDisorders', label: 'Anxiety Disorders' },
        { value: 'eatingDisorder', label: 'Eating Disorder' },
        { value: 'ecw', label: 'Vanilla' },
        { value: 'cqwvq', label: 'Caon' },
        { value: 'cfqw', label: 'Vaanciwa' },
        { value: 'dqwcw', label: 'Vancniwa' },
    ];

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
                <div className="sign-up-in">
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
                    <div className="mental-health-selector" onChange={handleHealthChange}>
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
                </div>
                <div className="info">
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
                </div>
            </div>
        </>
    )
}

export default withRouter(Registration);

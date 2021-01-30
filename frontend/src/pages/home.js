import React from 'react';
import Navbar from "../components/nav";
import Loading from "../components/loading";
import './home.css'

const Home = () => {
    return (
        <>
            <Navbar/>
            <div className="home-screen">
                <Loading/>
                <div className="home-text">
                    <h2 className="home-h2">Based on the categories you chose when creating an account,<br/>
                        we are matching you with someone who chose similar categories</h2>
                </div>
            </div>
        </>
    )
}

export default Home;

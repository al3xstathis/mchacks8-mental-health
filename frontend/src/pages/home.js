import React, {useEffect} from 'react';
import Navbar from "../components/nav";
import {connect} from '../scripts/websocket';
import Loading from "../components/loading";
import './home.css'

const Home = () => {
    useEffect(() => {
        connect({
            uid: '123456',
            username: 'Nicolas',
            keywords: ['riperoni', 'jabronis', 'lorem', 'ipsum']
        }, true);
    });

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

import React, {useEffect} from 'react';
import Navbar from "../components/nav";
import {connect} from '../scripts/websocket';

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
        </>
    )
}

export default Home;

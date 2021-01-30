import React from 'react';
import './loading.css';
import loadingSVG from '../assets/Eclipse-1s-200px.svg';

const Loading = () => {
    return (
        <>
            <img className="loading-animation" alt="loading" src={loadingSVG}/>
        </>
    )
}
export default Loading;

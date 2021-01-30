import React from 'react';
import {Link} from "react-router-dom";
import './nav.css';

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <div className="nav-title">
                    <Link to={'/'}>Mental Health Chat</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;

import React from 'react';
import {Link} from "react-router-dom";
import './nav.css';

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <div className="nav-title">
                    <Link className="nav-link" to={'/'}>Mental Health Chat</Link>
                </div>
                <div>
                    <Link className="nav-buttons" to={'/home'}>
                        <ion-icon name="home-outline"></ion-icon>
                    </Link>
                    <Link className="nav-buttons" to={'/registration'}>
                        <ion-icon name="person-outline"></ion-icon>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar-container">
            <div className="navbar-left">
                <div className="my-pic">
                    <Link to='/'>
                        <img src="./src/assets/Imgs/Matts_pic.jpg" className="matts-pic" />
                    </Link>
                </div>
            </div>
            <div className="navbar-center">
                <h1>FSJS Portfolio</h1>
            </div>
            <div className="navbar-right">
            <Link to='/login' className="item login">
                    <img src="./src/assets/Imgs/Login.jpg" className="login-logo" />
                </Link>
            </div>
        </div>
    )
}
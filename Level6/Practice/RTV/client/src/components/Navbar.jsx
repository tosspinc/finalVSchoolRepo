import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from '../pages/Popup';
import { userContext } from "../context/userContext";
import '../CssFiles/navbar.css';

export default function Navbar() {
    const [popupVisible, setPopupVisible] = useState(false);
    const { userState, logout } = useContext(userContext);
    const navigate = useNavigate();

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    }

    const handleNavigation = (path) => {
        console.log(path)
        if (path) {
            navigate(path)
        }
    }

    return (
        <nav className="navbar">
            <div className="navleft-logo">
                <Link to="/">
                    <img src="./src/assets/Imgs/RockTheVote.png" className="navbar-logo" />
                </Link>
            </div>
            <div className="navcenter-navigation">
                <div className="navigation-dropdown">
                    <select onChange={(e) => handleNavigation(e.target.value)}>
                        <option value="">Navigate to...</option>
                        <option value="/currentIssues">Current Issues</option>
                        <option value="/addNewIssue">Add New Issue</option>
                        <option value="/myPosts">My Posts</option>
                    </select>   
                </div>
            </div>
            <div className="navright-user">
                {userState.user && userState.user.username ? (
                    <div className="user-info">
                        <span className="navbar-username">Welcome: {userState.user.username}</span>
                        <button className="logout-button" onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <button className="item-login" onClick={togglePopup}>
                        <img src="../src/assets/Imgs/Login.jpg" className="login-logo" />    
                    </button>
                )}
            </div>
            {popupVisible && <Popup closePopup={togglePopup} />}
        </nav>
    )
}

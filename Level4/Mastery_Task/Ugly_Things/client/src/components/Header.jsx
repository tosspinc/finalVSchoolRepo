import React, {useState} from "react";
import {NavLink} from "react-router-dom";


export default function Header(props) {
    const [isActive, setIsActive] = useState(false)

    function cusNav() {
        setIsActive(!isActive)
    }

    return (    
        <>
            <div>
                <div className={`header-logo dark-mode`}>
                    <a href='#'>
                        <img src='/Imgs/Tosspi_Logo.png' alt='Tosspi Logo' />
                    </a>
                </div>
                <div className={`nav ${isActive ? "responsive" : ""}`} id="menu">
                    <NavLink
                        exact="true"
                        to="/"
                        onClick={() => setIsActive(false)}
                    >
                    Submit Image
                    </NavLink>
                    <NavLink
                        to="/history"
                        onClick={() => setIsActive(false)}
                    >
                    History
                    </NavLink>
                    <button className="icon" onClick={cusNav}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}
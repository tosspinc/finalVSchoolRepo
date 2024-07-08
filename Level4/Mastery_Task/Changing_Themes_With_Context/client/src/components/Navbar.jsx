import React, {useContext, useState} from "react";
import {NavLink} from 'react-router-dom'
import { ThemeContext } from "../ThemeContext";


export default function Navbar(props) {
    const [isActive, setIsActive] = useState(false)
    const value = useContext(ThemeContext)

    function cusNav() {
        setIsActive(!isActive)
    }

    return (
        <>
            <div>
                <div className={`header-logo ${value.value}-mode`}>
                    <a href='#'>
                        <img src='/Imgs/Tosspi_Logo.png' alt='Tosspi Logo' />
                    </a>
                </div>
                <div className={`nav ${isActive ? 'responsive' : ''}`} id='menu'>
                    <NavLink
                        exact 
                        to='/'
                        activeClassName="active"
                        onClick={() => setIsActive(false)}
                    >
                    Home
                    </NavLink>
                    <NavLink 
                        to='/dashboard'
                        activeClassName="active"
                        onClick={() => setIsActive(false)}
                    >
                    Dashboard
                    </NavLink>
                    <NavLink 
                        to='/tasks'
                        activeClassName="active"
                        onClick={() => setIsActive(false)}
                    >
                    Tasks
                    </NavLink>
                    <a href='javascript:void(0)' className='icon' onClick={cusNav}>
                        <i className='fa fa-bars'></i>
                    </a>
                </div>
            </div>
        </>       
    )
}
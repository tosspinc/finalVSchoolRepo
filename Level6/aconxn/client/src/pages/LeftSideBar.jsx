import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import '../cssfiles/leftsidebar.css';

export default function LeftSideBar() {
    const { userState, logout } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }
    

    return (
        <div className='left-sidebar-container'>
            <div className='left-sidebar-header'>
                <h1 className='left-sidebar-title'>ACONXN <span className="trademark">™</span></h1>
            </div>
            <nav className='left-sidebar-nav'>

            </nav>
            <div className='left-sidebar-footer'>
                <hr className='left-sidebar-footer-seperator' />
                <p className='.left-sidebar-footer-title'>Welcome: </p>
                <button className='left-sidebar-logout-button' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
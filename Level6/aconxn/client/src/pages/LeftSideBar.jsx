import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import '../cssfiles/leftsidebar.css';

export default function LeftSideBar() {
    const { userState } = useContext(UserContext)
    

    return (
        <div className='left-sidebar-container'>
            <div className='left-sidebar-header'>
                <h1 className='left-sidebar-title'>ACONXN <span className="trademark">™</span></h1>
            </div>
            <nav className='left-sidebar-nav'>

            </nav>
            
        </div>
    )
}
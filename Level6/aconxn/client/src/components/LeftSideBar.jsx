import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { useUIContext } from '../context/UIContext';
import '../cssfiles/leftsidebar.css';

export default function LeftSideBar() {
    const { userState, logout } = useContext(UserContext);
    const { openIssueForm } = useUIContext()
    const navigate = useNavigate();

    // Destructure the user from userState
    const { user } = userState || {};

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleCreateIssue = (e) => {
        e.preventDefault()
        openIssueForm()
        navigate('/current-issues')
    }

    return (
        <div className='left-sidebar-container'>
            <div className='left-sidebar-header'>
                <h1 className='left-sidebar-title'>ACONXN <span className="trademark">™</span></h1>
            </div>
            <nav className='left-sidebar-nav'>
                <Link to='/profile' className='left-sidebar-link'>Profile</Link>
                <Link to='/create-issue' className='left-sidebar-link' onClick={handleCreateIssue}>Create Issue</Link>
            </nav>
            <div className='left-sidebar-footer'>
                <hr className='left-sidebar-footer-separator' />
                {user && <p className='left-sidebar-footer-title'>Welcome: {user.username}</p>}
                <button className='left-sidebar-logout-button' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

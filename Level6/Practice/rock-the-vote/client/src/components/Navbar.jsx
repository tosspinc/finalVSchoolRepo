import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import '../cssFiles/navbar.css'
import { UserContext } from '../context/UserProvider';

function Navbar(props) {
    const {user} = useContext(UserContext)
    const {logout} = props
    
    return ( 
        <div id="navbar">
            <div className='navbar-links'>
                <Link to = "/profile"><button>Profile</button></Link>
                <Link to = "/public"><button>Public</button></Link>
                <Link to = "/"><button onClick = {logout}>Logout</button></Link>
            </div>
            
            <div className='user-info'>
                {user && user.username && (
                    <span> welcome: {user.username}</span>
                )}
            </div>
        </div>
    );
}

export default Navbar;
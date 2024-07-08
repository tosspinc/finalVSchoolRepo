import { Link } from "react-router-dom";
import React from "react";

export default function Navbar() {
    return (
        <>  
            <div className="navbar_container">
                <Link className='home_link' to='/'>Home</Link>
                <span className="separator"> | </span>
                <Link className='profile_link' to='/profile'>Profile</Link>
            </div>
        </>
    )
}

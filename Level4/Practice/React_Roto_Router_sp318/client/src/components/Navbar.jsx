import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className='navbar'>
          <Link style={{padding: '0 15px' }} to= '/'>
            Home
          </Link>
          <Link style={{padding: '0 15px' }} to= '/about'>
            About
          </Link>
          <Link style={{padding: '0 15px' }} to= '/services'>
            Services
          </Link>
       
        </nav>
    )
}
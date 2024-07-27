import React from "react";
import { Link } from 'react-router-dom';
import '../cssfiles/footer.css';

export default function Footer() {
    return (
        <footer className="footer-bottom-row">
            <nav className="footer-nav">
                <Link to='about' className='item about-info'>About</Link>
                <Link to='terms-of-service' className="item tos-info">Terms of Service</Link>
                <Link to='privacy-policy' className='item privacy-policy-info'>Privacy Policy</Link>
                <Link to='cookie-policy' className='item cookie-policy-info'>Cookie Policy</Link>
                <Link to='careers' className='item careers-info'>Careers</Link>
            </nav>
            <small>&copy; 2024 <span className='smapp-appname'>ACONXN</span> &trade; is a division of <span className="smapp-coname">Tosspi</span> &trade; all rights reserved.</small>
        </footer>
    )
}
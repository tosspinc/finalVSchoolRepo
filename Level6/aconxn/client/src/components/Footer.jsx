import React from "react";
import { Link, useLocation } from 'react-router-dom';
import '../cssfiles/footer.css';

export default function Footer() {
    const location = useLocation();

    const getFooterLinks = () => {
        const links = [
            { path: '/current-issues', label: 'Current Issues', className: 'current-issues' },
            { path: '/about', label: 'About', className: 'about-info' },
            { path: '/terms-of-service', label: 'Terms of Service', className: 'tos-info' },
            { path: '/privacy-policy', label: 'Privacy Policy', className: 'privacy-policy-info' },
            { path: '/cookie-policy', label: 'Cookie Policy', className: 'cookie-policy-info' },
            { path: '/careers', label: 'Careers', className: 'careers-info' }
        ];

        return links.filter(link => link.path !== location.pathname);
    };

    return (
        <footer className="footer-bottom-row">
            <nav className="footer-nav">
                {getFooterLinks().map(link => (
                    <Link key={link.path} to={link.path} className={`item ${link.className}`}>
                        {link.label}
                    </Link>
                ))}
            </nav>
            <small>&copy; 2024 <span className='smapp-appname'>ACONXN</span> &trade; is a division of <span className="smapp-coname">Tosspi</span> &trade; all rights reserved.</small>
        </footer>
    );
}

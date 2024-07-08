import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate()

    return (
        <div className="about_page">
            <h2>About </h2>

            <p>Welcome to Tosspi Home Services. We are located in Salt Lake City, Utah.  We provicwa needed residential plumbing services. We started Tosspi Home Services in 2019.</p>

            <div className="buttons-container">    
                <button onClick={() => navigate('/')}>Go to Home page</button>
                <button onClick={() => navigate('/services')}>Go to services page</button>
            </div>
        </div>
    )
}
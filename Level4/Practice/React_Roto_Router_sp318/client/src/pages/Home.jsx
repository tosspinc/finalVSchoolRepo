import React from "react";
import { useNavigate } from "react-router-dom";
 
export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="home_page">
            <h2>Home View - 1</h2>

            <p>Welcome to Tosspi Home Services. We are located in Salt Lake City, Utah.  We provicwa needed residential plumbing services. We started Tosspi Home Services in 2019.</p>

            <div className="buttons-container">
                <button onClick={() => navigate('/about')}>Go to About page</button>
                <button onClick={() => navigate('/services')}>Go to Services page</button>
            </div>
        </div>
    )
}
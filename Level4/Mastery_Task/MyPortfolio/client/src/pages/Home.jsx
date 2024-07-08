import React from "react";

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-left-column">
                <div className="home-info-container">
                    <div className="home-name-container">
                        <h1>Arnold Jones</h1>
                        <h2>Software Engineer</h2>
                        <h4>Full Stack Java Script</h4>
                    </div>
                    <div>
                        
                    </div>
                    <hr className="home-container-separator"></hr>
                </div>
            </div>
            <div className="social-media-container">
                            <ul className='social-media-links'>
                                <li>
                                    <a href="https://www.facebook.com/tosspinc"> 
                                        <img src="./src/assets/Imgs/socialmedia/facebook_logo.png" className="facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/tosspinc">
                                        <img src="./src/assets/Imgs/socialmedia/instagram_logo.jpg" className="instagram" />
                                    </a>
                                </li>    
                                <li>
                                    <a href="https://www.twitter.com/@IncTossp">
                                        <img src="./src/assets/Imgs/socialmedia/twitter_logo.jpg" className="twitter" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/arnoldmjones">
                                        <img src="./src/assets/Imgs/socialmeda/linkedin-logo.png" className="linkedin" />
                                    </a>
                                </li>
                            </ul>
                        </div>
            <div className="home-separator" />
            <div className="home-right-column">
            </div>
        </div>
    )
}
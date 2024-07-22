import React, { useContext } from "react"
import { Link } from "react-router-dom"
import "../cssFiles/footer.css"
import TosspiContext from "../context/TosspiContext"

export default function Footer () {

    const {token, user} = useContext(TosspiContext)

    return (
        <footer className="mainfooter">
            <div className="footer-top-row">
                <div className="footer-left-column">
                    <Link to= "about" className="item about-info">About</Link>
                    <Link to= "contact-info" className="item contact-info">Contact</Link>
                    <Link to= "careers" className="item careers-info">Careers</Link>
                    {token && user.isAdmin && <Link to='admin' className="item careers-info">Admin</Link>}
                </div>
                <div className="footer-center-column">

                </div>
                <div className="footer-right-column">
                    <ul className='social-media-links'>
                        <li>
                            <a href="https://www.facebook.com/tosspinc"> 
                                <img src="./src/assets/Imgs/facebook_logo.png" className="facebook" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/tosspinc">
                                <img src="./src/assets/Imgs/instagram_logo.jpg" className="instagram" />
                            </a>
                        </li>    
                        <li>
                            <a href="https://www.twitter.com/@IncTossp">
                                <img src="./src/assets/Imgs/twitter_logo.jpg" className="twitter" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/@Tosspinc">
                                <img src="./src/assets/Imgs/tiktok_logo.jpg" className="tiktok" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom-row">
                <small>&copy; 2024 Tosspi &trade;: The One Stop Shopping Place Inc. and its affiliates. All rights reserved.</small>
            </div>
        </footer>    
    )
}   
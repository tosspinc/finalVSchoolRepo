import React, {useContext} from "react";
import { ThemeContext } from "../ThemeContext";

export default function Footer() {
    const value = useContext(ThemeContext)
    return (
        <>
            <div className={`footer-content ${value.value}-mode`}>
                <ul className='socials'>
                    <li><a href='#'><i className='fa fa-facebook'></i></a></li>
                    <li><a href='#'><i className='fa fa-twitter'></i></a></li>
                    <li><a href='#'><i className='fa fa-google-plus'></i></a></li>
                    <li><a href='#'><i className='fa fa-youtube'></i></a></li>
                    <li><a href='#'><i className='fa fa-linkedin-square'></i></a></li>
                </ul>
                <div className={`footer-bottom ${value.value}-mode`}>
                    <p>copyright &copy;2024 Tosspi Designs Inc.
                        <span>
                            <a href='https://Tosspidesigns.github.io/'>
                                Tosspi Designs Inc.
                            </a>
                        </span>
                    </p>
                </div>    
            </div>
        </>
    )
}
import React, { useContext } from "react";
import { UserContext } from '../context/UserProvider';
import ChatBox from "./ChatBox";
import AdsBox from "./AdsBox";
import '../cssfiles/currentissues.css'

export default function CurrentIssues() {
    const { userState } = useContext(UserContext)
    
    return (
        <div className="smapp-currentissues-container">
        <div className="smapp-main-content">
            <div className="smapp-left-column">
                <div className="smapp-comments-container">
                    {/* Comments content */}
                </div>
            </div>
            <div className="smapp-right-column">
                <div className="smapp-adsbox">
                    <h2 className="section-header">Ads Section</h2>
                    <AdsBox />
                </div>
                <div className="smapp-chatbox">
                    <h2 className="section-header">Chat Section</h2>
                    <ChatBox />
                </div>
            </div>
        </div>
        <div className="smapp-top-row">
            <h1 className="currentissues-title">Current Topics</h1>
        </div>
    </div>
    )
}
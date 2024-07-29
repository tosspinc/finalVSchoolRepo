import React, { useContext } from "react";
import { UserContext } from '../context/UserProvider';
import '../cssfiles/currentissues.css'

export default function CurrentIssues() {
    const { userState } = useContext(UserContext)

    return (
        <div className="smapp-current-issues-container">
            <div className="smapp-left-column">
                <h1 className="smapp-left-column-title">ACONXN</h1>
                <hr className="smapp-left-column-seperator" />
                <ul className="smapp-left-column-links">

                </ul>
                <hr className="smapp-vertical-seperator" />
                <div className="smapp-left-column-user-info">
                    <p className="username-title">Username: {userState.user.username}</p>
                    <button className="smapp-left-column-logout-button">Logout</button>
                </div>
            </div>
            <div className="smapp-center-column">
                <h1 className="smapp-current-issues-topics-title">Current Topics</h1>
                <div className="smapp-comments-container">

                </div>
            </div>
            <div className="smapp-right-column">
                <div className="smapp-adds-container">

                </div>
                <div className="smapp-vertical-seperator"></div>
                <div className="smapp-right-happening-now">

                </div>
                <div className="smapp-right-seperator"></div>
                <div className="smapp-right-contacts">

                </div>
            </div>
        </div>
    )
}
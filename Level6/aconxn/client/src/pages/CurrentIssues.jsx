import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/UserProvider';
import ChatBox from "./ChatBox";
import AdsBox from "./AdsBox";
import IssueList from "../components/IssueList";
import IssueForm from "./IssueForm";
import '../cssfiles/currentissues.css';

export default function CurrentIssues() {
    const { userState, getUserIssues } = useContext(UserContext);
    const { user, issues } = userState;
    const [showIssueForm, setShowIssueForm] = useState(false);

    useEffect(() => {
        getUserIssues();
    }, []);

    const handleCreateIssueClick = () => {
        setShowIssueForm(true);
    };

    const handleFormClose = () => {
        setShowIssueForm(false);
    };

    return (
        <div className="currentissues-container">
            <div className="currentissues-toprow">
                <h1 className="currentissues-title">All Posts</h1>
            </div>
            <div className="currentissues-main-content">
                {showIssueForm ? (
                    <div className="currentissues-issueform-container">
                        <IssueForm onClose={handleFormClose} />
                    </div>
                ) : (
                        <div className="currentissues-comments-container">
                            <div className="currentissues-left-column">
                                <select className="currentissues-content-selector">
                                    <option value='outdoors'>Outdoors</option>
                                    <option value='sports'>Sports</option>
                                    <option value='travel'>Travel</option>
                                    <option value='health'>Health</option>
                                    <option value='beauty'>Beauty</option>
                                    <option value='religion'>Religion</option>
                                    <option value='paranormal'>Paranormal</option>
                                    <option value='entertainment'>Entertainment</option>
                                    <option value='politics'>Politics</option>
                                </select>
                                <hr className="currentissues-selector-seperator" />
                                <div className="currentissues-content-container">
                                    <div className="currentissues-item-container">
                                        {/* Container for selected item */}
                                    </div>
                                    <div className="currentissues-margin"></div>
                                    <div className="currentissues-input-container">
                                        <input type="text" maxLength="200" placeholder="Enter your comment" />
                                    </div>
                                    <hr className="currentissues-button-seperator" />
                                    <div className="currentissues-button-container">
                                        <button className="currentissues-submit-button">Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div className="currentissues-center-column">
                                <h2 className="currentissues-trendingposts-title">Trending Posts</h2>
                                <div className="currentissues-content-container">
                                    <div className="currentissues-item-container">
                                        {/* All current trending posts container */}
                                    </div>
                                    <div className="currentissues-margin"></div>
                                    <div className="currentissues-input-container">
                                        <input type="text" maxLength="200" placeholder="Enter your comment" />
                                    </div>
                                    <hr className="currentissues-button-seperator" />
                                    <div className="currentissues-button-container">
                                        <button className="currentissues-submit-button">Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div className="currentissues-right-column">
                            <h2 className="currentissues-myposts-title">My Posts</h2>
                            <div className="currentissues-content-container">
                                <div className="currentissues-item-container">
                                    <IssueList issues={issues} />
                                </div>
                                <div className="currentissues-margin"></div>
                                <div className="currentissues-input-container">
                                    <input type="text" maxLength="200" placeholder="Enter your comment" />
                                </div>
                                <hr className="currentissues-button-seperator" />
                                <div className="currentissues-button-container">
                                    <button className="currentissues-submit-button">Submit</button>
                                    <button className="currentissues-edit-button">Edit</button>
                                    <button className="currentissues-delete-button">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="smapp-right-column">
                    <div className="aconxn-adsbox-container">
                        <AdsBox />
                    </div>
                    <div className="aconxn-chatbox-container">
                        <ChatBox />
                    </div>
                </div>
            </div>
        </div>
    );
}

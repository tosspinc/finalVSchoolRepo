import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context/userContext";
import "../CssFiles/home.css";

export default function Home() {
    const [allIssues, setAllIssues] = useState([]);
    const [userIssues, setUserIssues] = useState([]);
    const { userState } = useContext(userContext);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await fetch('/api/issues');
                const data = await response.json();
                setAllIssues(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        };

        fetchIssues();
    }, []);

    useEffect(() => {
        if (userState.user) {
            const fetchUserIssues = async () => {
                try {
                    const response = await fetch(`/api/issues/user/${userState.user._id}`);
                    const data = await response.json();
                    setUserIssues(Array.isArray(data) ? data : []);
                } catch (error) {
                    console.error("Error fetching user issues:", error);
                    setUserIssues([]); // Ensure it's an empty array on error
                }
            };

            fetchUserIssues();
        } else {
            setUserIssues([]); // Reset to empty array if user is not logged in
        }
    }, [userState.user]);

    return (
        <div className="home-container">
            <h1 className="title">All Current Issues</h1>
            <ul className="issues-list">
                {allIssues.map(issue => (
                    <li key={issue._id}>
                        <h2>{issue.title}</h2>
                        <p>{issue.description}</p>
                    </li>
                ))}
            </ul>
            {userState.token && (
                <>
                    <h1 className="title">My Current Issues</h1>
                    <ul className="issues-list">
                        {userIssues.map(issue => (
                            <li key={issue._id}>
                                <h2>{issue.title}</h2>
                                <p>{issue.description}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

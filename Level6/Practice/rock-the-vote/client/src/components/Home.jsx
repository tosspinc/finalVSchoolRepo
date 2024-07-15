import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import '../cssFiles/home.css'

    export default function Home (){
    const [allIssues, setAllIssues] = useState([])
    const { isAuthenticated } = useContext(UserContext)

    useEffect(() => {
        const fetchIssues = async () => {
            if (isAuthenticated()) {
                try {
                    const res = await fetch('/api/issues')
                    const data = await res.json()
                    setAllIssues(Array.isArray(data) ? data : [])
                } catch (error) {
                    console.error('Error fetching issues:', error)
                }
            } else {
                console.error('Error fetching issues:', error)
            }
        }
        fetchIssues()
    }, [isAuthenticated])

    return (
        <div className="home-container">
            <h1 className="issues-list">Current Issues</h1>
            <ul className="issues-list">
                {allIssues.map(issue => {
                    <li key={issue._id}>
                        <h2>{issue.title}</h2>
                        <p>{issue.description}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import '../cssFiles/currentissuespage.css';

export default function CurrentIssuesPage() {
    const [issues, setIssues] = useState([])

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const res = await fetch('/api/user/issues')
                const data = await res.json()
                setIssues(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error('Error fetching current issues: ', error)
            }
        }
        fetchIssues()
    }, [])

    /*
    return (
        <div>
            {issue.map(issue => (
                <div key={issue._id}>
                    <h2>{issue._id}</h2>
                    <p>{issue.description}</p>
                </div>
            ))}
        </div>
    )
    */   
}
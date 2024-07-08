import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import '../cssFiles/public.css';

export default function Public() {
    const { getAllIssues } = useContext(UserContext);
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const issuesData = await getAllIssues();
                setIssues(issuesData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchIssues();
    }, []);

    return (
        <div className='public-wrapper'>
            <div className='public-container'>
                <h2 className='public-issues-title'>All Current Issues</h2>
                <hr className='public-issues-breakline' />
                <ul className='issues-list'>
                    {issues.map(issue => (
                        <li key={issue._id} className='issue-item'>
                            <div className='issue-list-container'>
                                <h2 className='issue-title'>Title: {issue.title}</h2>
                                <h3 className='issue-description'>Description: {issue.description}</h3>
                                {issue.imgUrl && <img src={issue.imgUrl} alt={issue.title} style={{ height: '100px', width: '100px' }} />}
                                <h3 className='issue-author'>Author: {issue.username}</h3>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

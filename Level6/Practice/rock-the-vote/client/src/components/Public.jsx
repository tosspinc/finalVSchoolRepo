import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import '../cssFiles/public.css';

export default function Public() {
    const { getAllIssues, handleUpvote, handleDownvote } = useContext(UserContext);
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const issuesData = await getAllIssues();
                // Initialize upvotes and downvotes counts to 0
                const issuesWithVotes = issuesData.map(issue => ({
                    ...issue,
                    upvotes: 0,
                    downvotes: 0
                }));
                setIssues(issuesWithVotes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchIssues();
    }, []);

    const incrementUpvote = (issueId) => {
        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue._id === issueId ? { ...issue, upvotes: issue.upvotes + 1 } : issue
            )
        );
        handleUpvote(issueId);
    };

    const incrementDownvote = (issueId) => {
        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue._id === issueId ? { ...issue, downvotes: issue.downvotes + 1 } : issue
            )
        );
        handleDownvote(issueId);
    };

    return (
        <div className='public-wrapper'>
            <div className='public-container'>
                <h2 className='public-issues-title'>All Current Issues</h2>
                <hr className='public-issues-breakline' />
                <ul className='issues-list'>
                    {issues.map(issue => (
                        <li key={issue._id} className='issue-item'>
                            <div className='issue-list-container'>
                                {issue.imgUrl && <img src={issue.imgUrl} alt={issue.title} style={{ height: '100px', width: '100px' }} />}
                                <h2 className='issue-title'>Title: {issue.title}</h2>
                                <h3 className='issue-description'>Description: {issue.description}</h3>
                                <h3 className='issue-author'>Author: {issue.username}</h3>
                            </div>
                            <div className='vote-buttons-container'>
                                <div className='vote-button' onClick={() => incrementUpvote(issue._id)}>
                                    <img src='../src/assets/IMGS/upvote.png' alt='Upvote' className='vote-icon' />
                                    <span className='vote-count'>{issue.upvotes}</span>
                                </div>
                                <div className='vote-button' onClick={() => incrementDownvote(issue._id)}>
                                    <img src='../src/assets/IMGS/downvote.png' alt='Downvote' className='vote-icon' />
                                    <span className='vote-count'>{issue.downvotes}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

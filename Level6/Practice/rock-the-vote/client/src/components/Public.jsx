import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import '../cssFiles/public.css';

export default function Public() {
    const { getAllIssues, handleUpvote, handleDownvote, isAuthenticated, user, addComment } = useContext(UserContext);
    const [issues, setIssues] = useState([]);
    const [comments, setComments] = useState({});
    const [commentContent, setCommentContent] = useState({});

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const issuesData = await getAllIssues();
                if (Array.isArray(issuesData)) {
                    const issuesWithVotes = issuesData.map(issue => ({
                        ...issue,
                        upvotes: issue.upvotes ? issue.upvotes.length : 0,
                        downvotes: issue.downvotes ? issue.downvotes.length : 0
                    }));
                    setIssues(issuesWithVotes);
                } else {
                    console.error('Fetched data is not an array:', issuesData);
                }
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };
        fetchIssues();
    }, [getAllIssues]);

    const fetchComments = async (issueId) => {
        try {
            const res = await fetch(`/api/comments/${issueId}`);
            const data = await res.json();
            setComments(prevComments => ({ 
                ...prevComments, 
                [issueId]: data 
            }));
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async (issueId) => {
        try {
            const newComment = {
                content: commentContent[issueId],
                issueId,
                username: isAuthenticated() ? user.username : 'Anonymous'
            };
            await addComment(issueId, newComment);
            setCommentContent(prevContent => ({ 
                ...prevContent, 
                [issueId]: '' 
            }));
            fetchComments(issueId); // Fetch comments again to update the UI
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleInputChange = (e, issueId) => {
        setCommentContent(prevContent => ({ 
            ...prevContent, 
            [issueId]: e.target.value 
        }));
    };

    const incrementUpvote = async (issueId) => {
        if (isAuthenticated()) {
            try {
                const updatedIssue = await handleUpvote(issueId);
                if (updatedIssue) {
                    setIssues(prevIssues =>
                        prevIssues.map(issue =>
                            issue._id === updatedIssue._id ? {
                                ...issue,
                                upvotes: updatedIssue.upvotes.length,
                                downvotes: updatedIssue.downvotes.length
                            } : issue
                        )
                    );
                }
            } catch (error) {
                console.log('Error upvoting issue:', error);
            }
        } else {
            console.log('User is not authenticated.');
        }
    };

    const incrementDownvote = async (issueId) => {
        if (isAuthenticated()) {
            try {
                const updatedIssue = await handleDownvote(issueId);
                if (updatedIssue) {
                    setIssues(prevIssues =>
                        prevIssues.map(issue =>
                            issue._id === updatedIssue._id ? {
                                ...issue,
                                upvotes: updatedIssue.upvotes.length,
                                downvotes: updatedIssue.downvotes.length
                            } : issue
                        )
                    );
                }
            } catch (error) {
                console.log('Error downvoting issue:', error);
            }
        } else {
            console.log('User is not authenticated.');
        }
    };

    return (
        <div className='public-wrapper'>
            <div className='public-container'>
                <h1>Current Issues</h1>                
                <ul className='issues-list'>
                    {issues.map(issue => (
                        <li key={issue._id} className='issue-item'>
                            <div className='issue-list-container'>
                                {issue.imgUrl && 
                                    <img src={issue.imgUrl} 
                                        alt={issue.title} 
                                        style={{ 
                                            height: '100px', 
                                            width: '100px' 
                                        }} 
                                    />}
                                <h2 className='issue-title'>Title: {issue.title}</h2>
                                <h3 className='issue-description'>Description: {issue.description}</h3>
                                <h3 className='issue-author'>Author: {issue.username}</h3>
                                {issue.author !== user._id && (
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
                                )}
                                <div className='comments-section'>
                                    <h3>Comments:</h3>
                                    <ul className='comments-list'>
                                        {Array.isArray(comments[issue._id]) && comments[issue._id].map(comment => (
                                            <li key={comment._id} 
                                                className='comment-item'>{comment.username}: {comment.content}</li>
                                        ))}
                                    </ul>
                                    <textarea
                                        value={commentContent[issue._id] || ''}
                                        onChange={(e) => handleInputChange(e, issue._id)}
                                        placeholder='Add a comment'
                                    />
                                    <button onClick={() => handleCommentSubmit(issue._id)}>Submit</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

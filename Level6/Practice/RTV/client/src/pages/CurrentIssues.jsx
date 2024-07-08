import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

export default function CurrentIssues() {
    
    const [visibleCommentsIssueId, setVisibleCommentsIssueId] = useState(null)
    const [issueData, setIssueData] = useState({ comments: [], showCommentForm: {}, newComment: {} })
    const navigate = useNavigate()
    const { userState, fetchIssues, handelVote, issues, toggleComments, submitComment, userState: { errMsg } } = useContext(userContext)

    const handleToggleComments = async (issueId) => {
        setVisibleCommentsIssueId(prevId => prevId === issueId ? null : issueId);
        if (visibleCommentsIssueId !== issueId) {
            const response = await toggleComments(issueId);
            if (response.success) {
                setIssueData(prevData => ({
                    ...prevData,
                    comments: { ...prevData.comments, [issueId]: response.comments }
                }));
            }
        }
    };
    
    const handleAddComment = (issueId) => {
        setIssueData(prevData => ({
            ...prevData,
            showCommentForm: { ...prevData.showCommentForm, [issueId]: !prevData.showCommentForm[issueId] }
        }));
    };

    const handleSubmitComment = async (issueId, commentText) => {
        const response = await submitComment(issueId, { content: commentText });
        if (response.success) {
            setIssueData(prevData => ({
                comments: {
                    ...prevData.comments,
                    [issueId]: [...(prevData.comments[issueId] || []), response.newComment],
                },
                showCommentForm: { ...prevData.showCommentForm, [issueId]: false },
                newComment: { ...prevData.newComment, [issueId]: '' },
            }));
        }
    };

    return (
        <div className="issues-container">
            <h1>My Issues</h1>
            {errMsg && <p className="error-message">{errMsg}</p>}
            <ul>
                {issues.map(issue => (
                    <li key={issue._id}>
                        <h2>{issue.title}</h2>
                        <p>{issue.description}</p>
                        <button onClick={() => handleVote(issue._id, 'upvote')}>Upvote</button>
                        <button onClick={() => handleVote(issue._id, 'downvote')}>Downvote</button>
                        <p>Votes: {issue.upvotesCount - issue.downvotesCount}</p>
                        <p style={{ cursor: 'pointer' }} onClick={() => handleToggleComments(issue._id)}>
                            Comments: {issue.commentsCount}
                        </p>
                        {visibleCommentsIssueId === issue._id && (
                            <>
                                <ul>
                                    {issueData.comments[issue._id] && issueData.comments[issue._id].map(comment => (
                                        <li key={comment._id}>{comment.content}</li>
                                    ))}
                                </ul>
                                <button onClick={() => handleAddComment(issue._id)}>Add Comment</button>
                                {issueData.showCommentForm[issue._id] && (
                                    <div>
                                        <textarea
                                            value={issueData.newComment[issue._id] || ''}
                                            onChange={(e) => setIssueData(prevData => ({
                                                ...prevData,
                                                newComment: { ...prevData.newComment, [issue._id]: e.target.value }
                                            }))}
                                        />
                                        <button onClick={() => handleSubmitComment(issue._id, issueData.newComment[issue._id])}>Submit</button>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

}
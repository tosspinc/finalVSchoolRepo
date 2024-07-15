import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import IssueForm from './IssueForm';
import '../cssFiles/profile.css';

function Profile() {
    const { user, issues, getUserIssues, deleteIssue, editIssue, addComment, deleteComment, editComment } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIssue, setCurrentIssue] = useState({});
    const [currentComment, setCurrentComment] = useState({});
    const [isCommentEditing, setIsCommentEditing] = useState(false);
    const [commentContent, setCommentContent] = useState('');

    useEffect(() => {
        getUserIssues ()
        },[]);

    const handleEditClick = (issue) => {
        setIsEditing(true);
        setCurrentIssue(issue);
    };

    const handleEditSubmit = (updatedIssue) => {
        setIsCommentEditing(true)
        setCurrentComment(comment)
        setCommentContent(comment.content)
    }

    const handleCommentDeletClick = (commentId) => {
        deleteComment(currentIssue._id, commentId)
    }

    const handleCommentEditSubmit = () => {
        editComment(currentIssue._id, currentComment._id, { content: commentContent })
        setIsCommentEditing(false)
        setCurrentComment({})
        setCommentContent('')
    }

    // const handleDeleteClick = (issueId) => {
    //     deleteIssue(issueId);
    // };

    // const handleEditSubmit = (updatedIssue) => {
    //     editIssue(currentIssue._id, updatedIssue);
    //     setIsEditing(false);
    //     setCurrentIssue({});
    // };

    return (
        <div className='profile-wrapper'>
            <h1 className='profile-title'>Username: {user.username}</h1>
            <div className='profile-container'>
                <h2 className='profile-issues-title'>My Current Issues</h2>
                <hr className='profile-issues-breakline' />
                <ul className='issues-list'>
                    {issues.map(issue => (
                        <li key={issue._id} className='issue-item'>
                            <div className='issue-list-container'>
                                <h2 className='issue-title'>Title: {issue.title}</h2>
                                <h3 className='issue-description'>Description: {issue.description}</h3>
                                {issue.imgUrl && <img src={issue.imgUrl} alt={issue.title} style={{ height: '100px', width: '100px' }} />}
                                <p>Author: {issue.username}</p>
                                <div className='button-container'>
                                    <button className='buttons' onClick={() => handleEditClick(issue)}>Edit</button>
                                    <button className='buttons' onClick={() => handleDeleteClick(issue._id)}>Delete</button>
                                </div>
                                <div className='comments-section'>
                                    <h3>Comments:</h3>
                                    <ul className='comments-list'>
                                        {Array.isArray(issue.comments) && issue.comments.map(comment => (
                                            <li key={comment._id} className='comment-item'>
                                                <span><strong>{comment.username}</strong> {comment.content}</span>
                                                {comment.author === user._id && (
                                                   <div>
                                                    <button onClick={() => handleCommentEditClick(comment._id)}>Edit</button>
                                                    <button onClick={() => handleCommentDeleteClick(comment._id)}>Delete</button>
                                                   </div> 
                                                )}       
                                            </li>
                                        ))}
                                    </ul>
                                    {isCommentEditing && (
                                        <div>
                                            <textarea
                                                value={commentContent}
                                                onChange={(e) => setCommentContent(e.target.value)}
                                                placeholder='Edit your comment'
                                            />
                                            <button onClick={handleCommentEditSubmit}>Submit</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <IssueForm onSubmit={isEditing ? handleEditSubmit : null} issue={isEditing ? currentIssue : null} />
        </div>
    );
}

export default Profile;

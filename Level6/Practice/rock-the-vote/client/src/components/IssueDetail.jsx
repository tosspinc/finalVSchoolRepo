import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserProvider';

function IssueDetail({ issue }) {
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const { user, addComment, isAuthenticated } = useContext(UserContext);

    // Function to fetch comments for the issue
    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/comments/${issue._id}`);
            const data = await res.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // Function to handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated()) {
            console.log('User is not authenticated.');
            return;
        }
        try {
            const newComment = {
                content: commentContent,
                issueId: issue._id,
                author: user._id,
            };
            await addComment(newComment);
            setCommentContent('');
            fetchComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [issue._id]);

    return (
        <div>
            <h1>{issue.title}</h1>
            <p>{issue.description}</p>
            {/* Comments Section */}
            <div>
                <h2>Comments</h2>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment._id}>{comment.content}</li>
                    ))}
                </ul>
                {isAuthenticated() && (
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            placeholder="Add a comment"
                            required
                        />
                        <button type="submit">Add Comment</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default IssueDetail;

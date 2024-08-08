import React, { useContext, useState } from 'react';
import { UserContext, userAxios } from '../context/UserProvider';
import '../cssfiles/issue.css';

export default function Issue(props) {
    const { id, title, description, imgUrl, username, handleSelect, handleUpvote, upvotes, handleDownvote, downvotes, showVoteButtons, showCheckbox, allowComments } = props;
    const { userState } = useContext(UserContext);
    const { user } = userState;
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(props.comments || []);

    const isOwnPost = user && username === user.username;

    const handleAddComment = async () => {
        try {
            const response = await userAxios.post(`/main/issues/${id}/comment`, { comment: newComment });
            setComments(response.data.comments);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="issue-container">
            <div className='issue'>
                <img src={imgUrl} className='issue-img' />
                <h1 className='issue-title'>{title}</h1>
                <h3 className='issue-description'>{description}</h3>
                {username && <p className='issue-username'>Posted By: {username}</p>}
                {showCheckbox && !isOwnPost && (
                    <input
                        type='checkbox'
                        className='issue-checkbox'
                        onChange={() => handleSelect(id)}
                    />
                )}
                {showVoteButtons && !isOwnPost && (
                    <div className='vote-buttons'>
                        <button onClick={() => handleUpvote(id)}><img src="../Imgs/upvote.png" alt="Upvote" /></button> <span>{upvotes}</span>
                        <button onClick={() => handleDownvote(id)}><img src="../Imgs/downvote.png" alt="Downvote" /></button> <span>{downvotes}</span>
                    </div>
                )}
                <div className="comments-section">
                    <h4>Comments:</h4>
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p><strong>{comment.username}:</strong> {comment.comment}</p>
                        </div>
                    ))}
                    {allowComments && !isOwnPost && (
                        <div className="add-comment">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                            />
                            <button onClick={handleAddComment}>Add Comment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

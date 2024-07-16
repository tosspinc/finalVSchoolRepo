import React, { useState, useContext } from "react";
import { UserContext } from '../context/UserProvider';
import '../cssFiles/publiccomments.css'

function PublicComments({ issueId }) {
    const [comment, setComment] = useState({
        content: ''
    })
    const { addComment} = useContext(UserContext)


    const handleChange = (e) => {
        const { name, value } = e.target
        setComment(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addComment(issueId, comment)
        // console.log("Comment submitted: ", comment)
        setComment({ content: '' })
    }

    return (
        <div className="public-comment-container">
            <h1 className="public-comment-title"> Add a Comment</h1>
            <form className="public-comment-textbox" onSubmit={handleSubmit}>
                <textarea
                    name='content'
                    value={comment.content}
                    onChange={handleChange}
                    placeholder="Write your comment here..."
                    rows='4'
                    cols='60'
                />
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}



export default PublicComments
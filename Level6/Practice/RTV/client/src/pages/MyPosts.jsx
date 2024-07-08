import React, { useState, useContext, useCallback, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import '../CssFiles/myPosts.css'

export default function myPosts() {
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const { addIssue, userState } = useContext(userContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newIssue = { title, description, author: userState.user._id }
        await addIssue(newIssue)
        setTitle('')
        setDescription('')
    }

    return (
        <div className='myposts-container'>
            <h1>Add New Issue</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title: </label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={{e} => setTitle(e.target.value)}
                    required
                />
                <label htmlFor='description'>Description: </label>
                <textarea
                    id='description'
                    value={description}
                    onChange={{e} => setDescription(e.target.value)}
                    required
                />
                <button type='submit'>Add Issue</button>
            </form>
        </div>
    )
}
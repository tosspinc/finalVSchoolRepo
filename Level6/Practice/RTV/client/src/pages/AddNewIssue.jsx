import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import Navigation from '../pages/Navigation';
import '../CssFiles/addNewIssue.css';

export default function AddNewIssue() {
    const [issue, setIssue] = useState({ title: '', description: '' })
    const navigate = useNavigate()
    const { AddNewIssue, errMsg, resetAuthErr } = useContext(userContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetAuthErr()
        const success = await AddNewIssue(issue)

        if (success) {
            navigate('/CurrentIssues')
        }
    }

    const handleChange = (e) => {
        const {name, value } = e.target
        setIssue(prevIssue => ({ ...prevIssue, [name]: value}))
    }

    return (
        <div className='addnewissue-container'>
            <h1>Add New Issue</h1>
            {errMsg && <p className='error-message'>{errMsg}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input
                        type='text'
                        id='title'
                        value={issue.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='description'>Description:</label>
                    <textarea
                        id='description'
                        value={issue.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit'>Add Issue</button>
            </form>
        </div>
    );
}

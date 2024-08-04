import React, { useState, useContext } from "react";
import { UserContext, userAxios } from '../context/UserProvider';
import '../cssfiles/issueform.css';
import { useNavigate } from 'react-router-dom'

export default function IssueForm({ onClose }) {
    const { getUserIssues } = useContext(UserContext);
    const [formData, setFormData] = useState({
        imgUrl: '',
        title: '',
        description: ''
    });

    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userAxios.post('/main/issues', formData);
            getUserIssues();
            navigate('/current-issues')
        } catch (error) {
            console.error('Error submitting issue: ', error);
        }
    };

    console.log(formData)

    return (
        <div className="aconxn-issue-container">
            <h1 className='aconxn-issue-title'>ACONXN<span className="trademark">™</span> Create an Issue</h1>
            <hr />
            <form className="aconxn-issueform-container" onSubmit={handleSubmit}>
                <input
                    className="aconxn-issueform-name"
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <input
                    className="aconxn-issueform-description"
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    className="aconxn-issueform-img"
                    name='imgUrl'
                    value={formData.imgUrl}
                    onChange={handleChange}
                    placeholder="Image URL"
                />
                <button className="aconxn-formsubmit-button">Submit</button>
                <button type="button" className="aconxn-formcancel-button" onClick={() => onClose()}>Cancel</button>
            </form>
        </div>
    );
}

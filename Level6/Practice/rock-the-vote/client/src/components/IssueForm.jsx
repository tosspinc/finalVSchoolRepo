import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider';
import '../cssFiles/issueform.css';

export default function IssueForm({ onSubmit, issue }) {

    const {addIssue} = useContext(UserContext)

    const initState = {
        title: '',
        description: '',
        imgUrl: ''
    }

    const [formData, setFormData] = useState(initState)

    useEffect(() => {
        if(issue) {
            setFormData(issue)
        }
    }, [issue])

    function handleChange(e) {
        const {name, value} = e.target 
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(onSubmit) {
            onSubmit(formData)
        }else {
            addIssue(formData)
        }
        setFormData(initState)
    }
    
    return (  
        <div className='new-issue-container'>
            <h1 className='new-issue-title'>{issue ? 'Edit Issue' : 'Post a new current issue'}</h1>
                <div className='issue-input-container'>
                    <form onSubmit={handleSubmit}>
                        {formData.imgUrl && <img src={formData.imgUrl} style={{height:'100px', width:'100px'}} alt='issue'/>}   
                        <label htmlFor='title' className='issue-form-label'>Title: </label>
                        <input
                            id='title'
                            className='title-textarea'
                            placeholder='Title'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <label htmlFor='description' className='issue-form-label'>Description: </label>
                        <textarea
                            id='description'
                            className='description-textarea'
                            placeholder='Description'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            maxLength='600'
                        />
                        <label htmlFor='imgUrl' className='issue-form-label'>Image: </label>
                        <input
                            id='imgUrl'
                            className='imgUrl-input'
                            placeholder='Image Url'
                            name='imgUrl'
                            value={formData.imgUrl}
                            onChange={handleChange}
                        />
                        <button className='issueform-button'>
                            Submit
                        </button>
                    </form>
                </div>
        </div>
    )
}
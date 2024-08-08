import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import '../cssfiles/signup.css'

export default function Signup({ isOpen, onClose }) {
    const { signup, errMsg } = useContext(UserContext)
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    if (!isOpen) return null

    function handleChange(e) {
        const { name, value } = e.target
        console.log(`Input ${name} changed to: `, value)
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('Submitting form with credentials: ', credentials)
        try {
            const success = await signup(credentials)
            if (success) {
                console.log('Signup successful, closing modal.')
                onClose()
            }
        } catch(error) {
            console.log('Signup failed.', error)
        }
    }

    return (
        <div className='smapp-signup-overlay'>
            <div className='smapp-signup-container'>
                <button className="smapp-close-button" onClick={onClose}>X</button>
                <h2 className='smapp-signup-title'>Welcome to ACONXN<span className="trademark">™</span></h2>
                <h3 className='smapp-signup-description'>Let's get you signed up.</h3>
                <form className='smapp-signup-form'>
                    <div className="smapp-signup-group">
                        <label className='smapp-group-label' htmlFor='username'>Username: </label>
                        <input className='smapp-group-input' 
                            type='text' 
                            id='username' 
                            name='username' 
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='smapp-signup-group'>
                        <label className='smapp-group-label' htmlFor='password'>Password: </label>
                        <input className='smapp-group-input' 
                            type='text' 
                            id='password' 
                            name='password'
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type='submit' className='smapp-signup-button' onClick={handleSubmit}>Sign up</button>
                        {errMsg && <p className="error-message">{errMsg}</p>}
                </form>
            </div>
        </div>
    )
}
 
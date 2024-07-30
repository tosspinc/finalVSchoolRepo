import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import '../cssfiles/login.css'

export default function Login({ isOpen, onClose }) {
    const { login, errMsg } = useContext(UserContext)
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    if (!isOpen) return null

    function handleChange(e) {
        const { name, value } = e.target
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const success = await login(credentials)
        if (success) {
            onClose()
            navigate('/current-issues')
        }
    }

    return (
        <div className='smapp-login-overlay'>
            <div className='smapp-aconxn-login-container'>
                <button className='smapp-close-button' onClick={onClose}>X</button>
                <h2 className='smapp-login-title'>Welcome to ACONXN<span className='trademark'>™</span></h2>
                <h3 className='smapp-login-description'>Welcome, Let's log into your account!</h3>
                <form className='smapp-login-form' onSubmit={handleSubmit}>
                    <div className='smapp-login-group'>
                        <label className='smapp-group-label' htmlFor='username'>Username: </label>
                        <input className='smapp-group-input'
                            type='text'
                            id='username'
                            name='username'
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='smapp-login-group'>
                        <label className='smapp-group-label' htmlFor='password'>Password: </label>
                        <input className='smapp-group-input'
                            type='password'
                            id='password'
                            name='password'
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type='submit' className='smapp-login-button'>Login</button>
                    {errMsg && <p className='error-message'>{errMsg}</p>}
                </form>
            </div>
        </div>
    )
}

import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../cssFiles/popup.css';
import TosspiContext from '../context/TosspiContext';

const Popup = ({ closePopup }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(TosspiContext);

    const handleUsernameChange = (event) => {
        console.log(event.target.value)
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        console.log(event.target.value)
        setPassword(event.target.value)
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        try {
            await login({ username, password })
            console.log('submitted')
            closePopup()
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    const handleSignupSubmit = async (event) => {
        event.preventDefault()
        try {
            await signup({ username, password })
            closePopup()
        } catch (error) {
            console.error('Signup failed:', error)
        }
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={closePopup}>X</button>
                <div className="popup-content">
                    {isLogin ? (
                        <div>
                            <h2>Login</h2>
                            <form onSubmit={handleLoginSubmit}>
                                <label>Username:</label>
                                <input 
                                    type="text" 
                                    value={username}
                                    name="username" 
                                    onChange={handleUsernameChange}
                                    required />
                                <label>Password:</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    name="password" 
                                    onChange={handlePasswordChange}
                                    required />
                                <button type="submit">Login</button>
                            </form>
                            <p onClick={() => setIsLogin(false)}>Don't have an account? Create one here.</p>
                        </div>
                    ) : (
                        <div>
                            <h2>Create Account</h2>
                            <form onSubmit={handleSignupSubmit}>
                                <label>Username:</label>
                                <input 
                                    type="text" 
                                    value={username}
                                    name="username" 
                                    onChange={handleUsernameChange}
                                    required />
                                <label>Password:</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    name="password" 
                                    onChange={handlePasswordChange}
                                    required />
                                <button type="submit">Create Account</button>
                            </form>
                            <p onClick={() => setIsLogin(true)}>Already have an account? Login here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;

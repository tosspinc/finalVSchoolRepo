import React, { useState, useContext } from 'react';
import { userContext } from '../context/userContext';
import '../CssFiles/popup.css';

const Popup = ({ closePopup }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, signup } = useContext(userContext);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            await login({ username, password });
            closePopup();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        try {
            await signup({ username, password });
            closePopup();
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

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
                                    placeholder="Username" 
                                    required 
                                />
                                <label>Password:</label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    name="password" 
                                    onChange={handlePasswordChange}
                                    placeholder="Password" 
                                    required 
                                />
                                <button type="submit">Login</button>
                            </form>
                            <p onClick={() => setIsLogin(false)}>Don't have an account? Create one here.</p>
                        </div>
                    ) : (
                        <div>
                            <h2>Create Account</h2>
                            <form onSubmit={handleSignUpSubmit}>
                                <label>Username:</label>
                                <input 
                                    type="text" 
                                    value={username}
                                    name="username" 
                                    onChange={handleUsernameChange}
                                    placeholder="Username"
                                    required 
                                />
                                <label>Password:</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    name="password" 
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                    required 
                                />
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

import React from "react";
import '../cssfiles/signup.css'

export default function Signup({ isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <div className='smapp-signup-overlay'>
            <div className='smapp-signup-container'>
                <button className="smapp-close-button" onClick={onClose}>X</button>
                    <h2 className='smapp-signup-title'>Welcome to ACONXN<span className="trademark">™</span></h2>
                    <h3 className='smapp-signup-description'>Let's get you signed up.</h3>
                    <form className='smapp-signup-form'>
                        <div className="smapp-signup-group">
                            <label className='smapp-group-label' htmlFor='username'>Username: </label>
                            <input className='smapp-group-input' type='text' id='username' name='username' />
                        </div>
                        <div className='smapp-signup-group'>
                            <label className='smapp-group-label' htmlFor='password'>Password: </label>
                            <input className='smapp-group-input' type='text' id='password' name='password' />
                        </div>
                        <button type='submit' className='smapp-signup-button'>Sign up</button>
                    </form>
            </div>
        </div>
    )
}
 
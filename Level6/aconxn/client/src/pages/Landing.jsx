import React, { useState } from 'react';
import '../cssfiles/landing.css';

export default function Home(props) {
  const initState = { username: '', password: '' }
  const [formData, setFromData] = useState(initState)
  const {isMember, submit, errMsg} = props

  function handleChange(e) {
    const { name, value } = e.target
    setFromData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    submit(formData)
  }

  return (
    <div className="home-container">
      <div className="home-left">
        <h1 className='smapp-title'>ACONXN<span className="trademark">™</span></h1>
        <h3 className='smapp-description'>The place to connect with those important to you</h3>
      </div>
      <div className="smapp-home-right">
        <div className="smapp-login-container">
          <h2 className='smapp-welcome-title'>Already A Member!</h2>
          {/* <button onClick={handleGoogleLogin}>Sign in with Google</button> */}
          {/* <button onClick={handleAppleLogin}>Sign in with Apple</button> */}
          <form className='smapp-form-container'>
            {/* <div className='smapp-input-group'>
              <div className='smapp-label-container'>
                <label htmlFor='username' className='smapp-input-label'>
                  Username: 
                </label>
              </div>
              <input
                id="username"
                placeholder="Username"
                name="username"
                value={FormData.username}
                onChange={handleChange}
                autoComplete='username' 
              />
            </div> */}
            {/* <div className='smapp-input-group'>
              <div className='smapp-label-container'>
                <label htmlFor='password' className='smapp-input-label'>
                  Password: 
                </label>
              </div>  
              <input 
                id='password'
                placeholder='Password'
                name='password' 
                type='password' 
                value={FormData.password}
                onChange={handleChange}
                autoComplete='current-password'
                
              />
            </div> */}
            <button type="submit" className='login-button'>Login</button>
            <h2 className='smapp-member-title'>Become a Member!</h2>
            <button type="submit" className='create-account-button'>Create Account</button>
          </form>
          <p className='smapp-agreement-text'>
            By signing up you agree to the <span className='smapp-tos-text'>terms of service</span> and <span className='smapp-pp-text'>privacy policy</span> including <span className='smapp-cp-text'>Cookie Use</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

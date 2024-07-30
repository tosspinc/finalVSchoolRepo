import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import '../cssfiles/home.css';

export default function Home(props) {
  const initState = { username: '', password: '' }
  const [formData, setFromData] = useState(initState)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  //const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setFromData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault( )
    submit(formData)
  }

  function toggleSignup() {
    setIsSignupOpen(!isSignupOpen)
  }

  function toggleLogin() {
    setIsLoginOpen(!isLoginOpen)
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
          <form className='smapp-form-container'>
            <button type="button" className='login-button' onClick={toggleLogin}>Login</button>
            <h2 className='smapp-member-title'>Become a Member!</h2>
            <button type="button" className='create-account-button' onClick={toggleSignup}>Create Account</button>
          </form>
          <p className='smapp-agreement-text'>
            By signing up you agree to the <span className='smapp-tos-text'>terms of service</span> and <span className='smapp-pp-text'>privacy policy</span> including <span className='smapp-cp-text'>Cookie Use</span>.
          </p>
        </div>
      </div>
      <Signup isOpen={isSignupOpen} onClose={toggleSignup} />
      <Login isOpen={isLoginOpen} onClose={toggleLogin} />
    </div>
  );
}

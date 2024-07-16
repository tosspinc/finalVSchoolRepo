import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import '../cssFiles/auth.css'

function Auth() {

  const { login, signup, errMsg, resetAuthErr } = useContext(UserContext)
  const [isMember, setIsMember] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (creds) => {
    const success = isMember ? await login(creds) : await signup(creds)
    if (success) {
      navigate('/profile')
    }
  }

  const toggleForm = () => {
    setIsMember(prevIsMember => !prevIsMember)
    resetAuthErr()
  }

  return ( 
    <div className='auth-container' id="auth-div">
      {
        isMember ? ( 
        <>
          <Form 
            isMember={isMember} 
            submit={handleSubmit}
            errMsg={errMsg}
            toggleForm={toggleForm}
            
          /> 
        </>
        ) :  (  
        <>
          <Form 
            isMember={isMember} 
            submit={handleSubmit}
            errMsg={errMsg}
            toggleForm={toggleForm}
            
          /> 
        </>
        )
      }
    </div>
  );
}

export default Auth;

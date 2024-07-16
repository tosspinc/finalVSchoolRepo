    import React, { useState } from 'react';
    import '../cssFiles/form.css'

    export default function Form(props) {
        const initState = {username: '', password: ''}
        const [formData, setFormData] = useState(initState)
        const {isMember, submit, errMsg, toggleForm} = props

        function handleChange(e) {
            const { name, value } = e.target
            setFormData(prevData => ({
                    ...prevData,
                    [name]: value
                }))
        }

        function handleSubmit(e) {
            e.preventDefault()
            submit(formData)
        }

        return ( 
            <form className='auth-form-container' onSubmit={handleSubmit}>
                <h2 className='rtv-form-title'>Rock The Vote!</h2>
                <div className='input-container'>
                    <label htmlFor='username' className='input-label'>Username: </label>
                    <input 
                        id='username'
                        placeholder='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete='username'
                    />
                    <label htmlFor='password' className='input-label'>Password: </label>
                    <input 
                        id='password'
                        placeholder='password'
                        name='password'
                        type='password'
                        value={formData.password} 
                        onChange={handleChange}
                        autoComplete='current-password'
                    />
                </div>
                <div className='button-container'>
                    <button type='submit' className='rtv-form-button'>
                        {isMember ? "Login" : 'Signup'}
                    </button>
                    <button type='button' className='rtv-form-button' onClick={toggleForm}>
                        {isMember ? 'Create an Account' : 'Already a Member'}
                    </button>
                </div>
                {errMsg && <p style={{ color: 'firebrick'}}>{errMsg}</p>}
            </form>
        );
    }
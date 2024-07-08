import React from 'react';
import ReactDOM from 'react-dom';
import CTA from './components/CTA';
import './App.css';

export default function App() {
  return (
    <>
      <div className='children-container'>
        <CTA position='right'>
          <div className='cta1'>
            <h1>This is an important CTA.</h1>
            <button className='clickme-button'>Click me now or you'll miss out!</button>
          </div>
        </CTA>

        <CTA>
          <form className='children-form-container'>
            <input className='email-box' type='email' placeholder='Enter Email Here.'/>
            <br />
            <button className='submit-button'>Submit</button>
          </form>
        </CTA>
      </div>
    </>
  )
}

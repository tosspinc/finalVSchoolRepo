import React from 'react'
import './App.css'
import Header from './components/Header'
import Generator from './components/Generator'

export default function App() {
    return (
    <>
      <div className='css-code-generator-container'>
        <Header />  
        <Generator /> 
      </div>
      
    </>
  )
}
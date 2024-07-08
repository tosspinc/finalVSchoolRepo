import React, {useState} from 'react'
import Header from './components/Header'
import Button from './components/Button'
import {ThemeContextProvider} from './components/ThemeContext'
import './App.css'

export default function App(props) {

  return (
    <>
      <div className='context-container'>
        <ThemeContextProvider>
          <Header />
          <Button />        
        </ThemeContextProvider>
      </div>
    </> 
  )
}
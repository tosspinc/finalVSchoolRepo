import React, {useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

export default function App() {
  const {token, logout} = useContext(UserProvider)

  return (
    <>
      <div>
        <Routes>
          <Route />
        </Routes>
      </div>        
    </>
  )
}
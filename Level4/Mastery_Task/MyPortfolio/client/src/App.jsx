import React from 'react'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/Contact.jsx'


import './App.css'

export default function App() {

  return (
    <div className='app'>
      <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      <Footer />
    </div>
  )
}
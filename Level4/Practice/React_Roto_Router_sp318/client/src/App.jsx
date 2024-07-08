import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path="/services/:serviceId" element={<serviceData />} /> Params 2
      </Routes>
 
        <Footer />
    </Router>
  )
}
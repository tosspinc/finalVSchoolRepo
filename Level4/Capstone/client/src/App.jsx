import { useState } from 'react'
import { Routes, Route  } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/Home'
import NavbarBottom from './components/NavbarBottom'
import ApplianceProducts from './pages/ApplianceProducts'
import WomensClothing from './pages/WomensClothing'
import MensClothing from './pages/MensClothing'
import KidsProducts from './pages/KidsProducts'
import ContactInfo from './pages/ContactInfo'
import About from './pages/About'
import Careers from './pages/Careers'
import './App.css'

export default function App() {

  return (
    <>
      <div className='App'>
        <Navbar />
        <NavbarBottom />  
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/appliance-products" element={<ApplianceProducts />} />
            <Route path="/womens-clothing" element={<WomensClothing />} />
            <Route path="/mens-clothing" element={<MensClothing />} />
            <Route path="/kids-products" element={<KidsProducts />} />
            <Route path="/contact-info" element={<ContactInfo />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        <Footer />
      </div>
    </>
  )
}


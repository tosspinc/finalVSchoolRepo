import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import NavbarBottom from './components/NavbarBottom'
import Home from './pages/home'
import ApplianceParts from './pages/ApplianceParts'
import WomansClothing from './pages/WomansClothing'
import MensClothing from './pages/MensClothing'
import KidsProducts from './pages/KidsProducts'
import Pets from './pages/Pets'
import ContactInfo from './pages/ContactInfo'
import About from './pages/About'
import Books from './pages/Books'
import Careers from './pages/Careers'
import TosspiContext, { TosspiWebsite } from './context/TosspiContext'
import './App.css'
import Carousel from './components/Carousel'
import { useContext, useEffect } from 'react'
import ChosenProduct from './pages/ChosenProduct'


export default function App() {

  const { getInventory, token } = useContext(TosspiContext)
  console.log(token)
  useEffect(() => {
    getInventory()
  }, [])


  return (
    <div className='App'>
      <div className='nav'>
        <Navbar />
        <NavbarBottom />
        <Carousel />
      </div>
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/applianceParts" element={<ApplianceParts />} />
          <Route path="/books" element={<Books />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/womans-clothing" element={<WomansClothing />} />
          <Route path="/mens-clothing" element={<MensClothing />} />
          <Route path="/kids-products" element={<KidsProducts />} />
          <Route path="/contact-info" element={<ContactInfo />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/login" element={<Login />} />
          <Route path='/product/:id' element={<ChosenProduct />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

import { Routes, Route } from 'react-router-dom'
import TosspiContext, { TosspiWebsite } from './context/TosspiContext'
import Navbar from './components/Navbar'
import NavbarBottom from './components/NavbarBottom'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/home'
import ApplianceParts from './pages/ApplianceParts'
import Books from './pages/Books'
import Pets from './pages/Pets'
import WomensItems from './pages/WomensItems'
import MensItems from './pages/MensItems'
import KidsItems from './pages/KidsItems'
import ContactInfo from './pages/ContactInfo'
import About from './pages/About'
import Careers from './pages/Careers'
import Carousel from './components/Carousel'
import { useContext, useEffect } from 'react'
import ChosenProduct from './pages/ChosenProduct'
import './App.css'

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
          <Route path="/womens-items" element={<WomensItems />} />
          <Route path="/mens-items" element={<MensItems />} />
          <Route path="/kids-items" element={<KidsItems />} />
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

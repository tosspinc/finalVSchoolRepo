import React, {useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserProvider'
import Footer from './components/Footer'
import Home from './pages/Home';
import CurrentIssues from './pages/CurrentIssues';
import About from './pages/About';
import TermsofService from './pages/TermsofService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiesPolicy';
import Careers from './pages/Careers';
import './App.css'

export default function App() {
  const { userState, setUserState } = useContext(UserContext)

  return (
    <>
      <div className='aconxn-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/current-issues' element={<CurrentIssues />} />
          <Route path='/about' element={<About />} />
          <Route path='/terms-of-service' element={<TermsofService />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/cookie-policy' element={<CookiePolicy />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>        
      <Footer />
    </>
  )
}
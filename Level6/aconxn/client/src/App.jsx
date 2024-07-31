import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import Footer from './components/Footer';
import LeftSideBar from './pages/LeftSideBar';
import Home from './pages/Home';
import CurrentIssues from './pages/CurrentIssues';
import About from './pages/About';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import Careers from './pages/Careers';
import IssueForm from './pages/IssueForm';
import Profile from './components/Profile'
import './App.css';

export default function App() {
  const location = useLocation();
  const showLeftSideBar = location.pathname !== '/';

  return (
    <UserProvider>
      <div className='app-container'>
        {showLeftSideBar && <LeftSideBar />}
        <div className={`main-content ${showLeftSideBar ? 'with-sidebar' : ''}`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/current-issues' element={<CurrentIssues />} />
            <Route path='/about' element={<About />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/cookie-policy' element={<CookiePolicy />} />
            <Route path='/careers' element={<Careers />} />
            <Route path='/create-issue' element={<IssueForm />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

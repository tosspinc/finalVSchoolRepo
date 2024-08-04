import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import { UIProvider } from './context/UIContext';
import Footer from './components/Footer';
import LeftSideBar from './components/LeftSideBar';
import Home from './pages/Home';
import CurrentIssues from './pages/CurrentIssues';
import About from './pages/About';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import Careers from './pages/Careers';
import Profile from './components/Profile'
import IssueForm from './components/IssueForm';
import './App.css';

export default function App() {
  const location = useLocation();
  const showLeftSideBar = location.pathname !== '/';

  return (
    <UserProvider>
      <UIProvider>
        <div className='app-container'>
          {showLeftSideBar && <LeftSideBar />}
          <div className={`main-content ${showLeftSideBar ? 'with-sidebar' : ''}`}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/create-issue' element={<IssueForm /> } />
              <Route path='/current-issues' element={<CurrentIssues />} />
              <Route path='/about' element={<About />} />
              <Route path='/terms-of-service' element={<TermsOfService />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/cookie-policy' element={<CookiePolicy />} />
              <Route path='/careers' element={<Careers />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </UIProvider>
    </UserProvider>
  );
}

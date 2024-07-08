import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { userContext } from './context/userContext';
import CurrentIssues from './pages/CurrentIssues';
import PrivateRoute from './components/PrivateRoute';
import AddNewIssue from './pages/AddNewIssue'; // Make sure this import is correct

export default function App() {

    const {userState: {token}} = useContext(userContext)

    return (
        <div className='App'>
            <div className='nav'>
                <Navbar />
                <div className='main'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/currentIssues" element={!token ? <Navigate to='/'/> : <CurrentIssues /> }/>
                        <Route path="/addNewIssue" element={!token ? <Navigate to='/'/> :<AddNewIssue />}  />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

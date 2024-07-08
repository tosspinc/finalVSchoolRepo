import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import './App.css';

export default function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </div>
  )
}
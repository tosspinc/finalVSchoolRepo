import React, {useContext} from "react"
import { UserContext } from "./context/UserProvider"
import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./components/Auth"
import Profile from "./components/Profile"
import Public from "./components/Public"
import Navbar from "./components/Navbar"

export default function App() {
  const {token, logout} = useContext(UserContext)

  return (
    <>
      <Navbar logout={logout} />
      <div id="app">
        <Routes>
          <Route path="/" element={token ? <Navigate to='/profile' /> : <Auth />} />
          <Route path="profile" element={<Profile />} />
          <Route path="public" element={<Public />} />
        </Routes>
      </div>
    </>
  )
}
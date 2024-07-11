import React, {useContext} from "react"
import { UserContext } from "./context/UserProvider"
import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./components/Auth"
import Profile from "./components/Profile"
import Public from "./components/Public"
import Navbar from "./components/Navbar"
import CurrentIssuesPage from "./components/CurrentIssuesPage"

export default function App() {
  const {token, logout} = useContext(UserContext)

  return (
    <>
      <Navbar logout={logout} />
      <CurrentIssuesPage />
      <div id="app">
        <CurrentIssuesPage />
        <Routes>
          <Route path="/" element={token ? <Navigate to='/profile' /> : <Auth />} />
          <Route path="profile" element={token ? <Profile /> : <Navigate to='/' />} />
          <Route path="public" element={<Public />} />
        </Routes>
      </div>
    </>
  )
}
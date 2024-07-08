import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import Header from './components/Header.jsx'
import MainContent from './components/MainContent.jsx'
//import MainContent from './components/MainContent.j'
import Footer from './components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>Just like Marriage</h1>
            <Header />
            <MainContent />
            <Footer />
      </div>
    </>
  )
}

export default App

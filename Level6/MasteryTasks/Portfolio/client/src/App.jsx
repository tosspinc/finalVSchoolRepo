import { useState } from 'react'
import './App.css'

export default function App() {
  const [] = useState(0)

  return (
    <div className='portfolio-container'>
      <div className='portfolio-header'>
        <h1>Arnold M. Jones</h1>
        <img src='./src/assets/Imgs/Matt-Jones-headshot.jpg' alt='headshot' className='my-headshot'></img>
      </div>
      <hr />
      <div className='portfolio-body'>
        <h1>Full Stack Engineer</h1>
      </div>
    </div>
  )
}
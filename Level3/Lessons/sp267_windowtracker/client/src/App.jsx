import React from 'react'
import WindowTracker from './components/WindowTracker'
import './App.css'

export default function App() {

  const [show, setShow] = React.useState(true)

  function toggle() {
    setShow(prevShow => !prevShow)
  }

  return (
    <div className='window-tracker-container'>
      <button onClick={toggle} className='tracker-button'>
        Toggle WindowTracker
      </button>
      {show && <WindowTracker />}
    </div>
  )
}
import React from 'react'
import useWordGame from './components/WordGame'

import './App.css'

export default function App() {

  const {
    timeRemaining,
    isTimeRunning,
    handleChange,
    startClock,
    textBoxRef,
    wordCount,
    text
  } = useWordGame(30)

    return (
    <>
      <div className='typing-game-container'>
        <br />
        <h1>How fast do you type?</h1>
        <textarea className='wordgame-textbox'
          ref={textBoxRef}
          value={text}
          onChange={handleChange}
          disabled={!isTimeRunning}    
        />
        <h4>Time Remaining:  {timeRemaining}</h4>
        <button onClick={startClock} disabled={isTimeRunning}>
          {wordCount > 0 ? "Play Again." : "Start"}
        </button>

        {wordCount > 0 && <h1>word Count: {wordCount}</h1>}
      </div>
    </>
  )
}



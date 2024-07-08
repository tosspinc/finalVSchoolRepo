import React from 'react'
import boxes from './components/boxes'
import './App.css'
import Box from './components/Box'

export default function App() {
  const [squares, setSquares] = React.useState(boxes) 
  
  //allows the id of each square when it is selected to be displayed in the console.
  function toggle(id) {
    console.log(id)
  }

  const squareElements = squares.map(square => (
    <Box 
      key={square.id} 
      id={square.id}  //add this so can access the id of each box individually from boxes.jsx file.
      on={square.on}
      toggle={toggle} />
  ))

  return (
    <main>
      {squareElements}
    </main>
  )
}

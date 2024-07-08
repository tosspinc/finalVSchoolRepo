import React from 'react'
import boxes from './components/Boxes'
import './App.css'

export default function App(props) {
  const [squares, setSquares] = React.useState(boxes) 
  
  const styles = {
    backgroundColor: props.darkMode ? "turquoise" : "black"
  }

  const squareElements = squares.map(square => (
    <div  style={styles} className='box' key={square.id}></div>
  ))

  return (
    <main>
      {squareElements}
    </main>
  )
}

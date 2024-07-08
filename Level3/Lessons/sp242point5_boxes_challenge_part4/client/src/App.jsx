import React from 'react'
import boxes from './components/boxes'
import './App.css'
import Box from './components/Box'

export default function App() {
  const [squares, setSquares] = React.useState(boxes) 
  
  //allows the id of each square when it is selected to be displayed in the console.
  //this is imperative code in react.
  function toggle(id) {
    setSquares(prevSquares => {   //looks at previous array of squares.
      const newSquares = []       //makes or defines a new array of squares.
      //below code loops over the previous array of squares.
       for(let i = 0; i < prevSquares.length; i++) {
        const currentSquare = prevSquares[i]
        //below code:  creates a new square object and replaces the old square object.
        if(currentSquare.id === id) {
          const updatedSquare = {  
            ...currentSquare,
            on: !currentSquare.on
          }
          newSquares.push(updatedSquare)  //pushes the new object to the new square array.
        } else {
          newSquares.push(currentSquare)  //if id's do not match then pushes the old square object.
        }
      }
      return newSquares
    })
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

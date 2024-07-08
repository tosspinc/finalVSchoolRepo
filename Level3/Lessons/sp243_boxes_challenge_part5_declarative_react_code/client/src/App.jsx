import React from 'react'
import boxes from './components/boxes'
import './App.css'
import Box from './components/Box'

export default function App() {
  const [squares, setSquares] = React.useState(boxes) 
  
  //this is declarative code in react. 
  //use the .map method as well.
  function toggle(id) {
    setSquares(prevSquares => {   //looks at previous array of squares.
      return prevSquares.map((square) => {   //return new array of squares, but does not modify the origional square array.
        //checking if id's of the square clicked match then replace the old square object with a new square object.
        //if they do not match then it will just display the old square object.  (: square portion of code.)
        return square.id === id ? {...square, on: !square.on} : square  
      })
    })
  }

  const squareElements = squares.map(square => (
    <Box 
      key={square.id} 
      id={square.id}  //add this so can access the id of each box individually from boxes.jsx file.
      on={square.on}
      toggle={toggle} 
      />

      //a different way of doing the above code for box is as follows:
      //<Box
      //key={square.id}
      //on={square.on}
      //toggle={() => toggle(square.id)}
      // /> for this to work also the code in the Box.jsx file needs to change to the following as well: 
      //    (Box.jsx part)
      //    return (
      //      <div
      //        style={styles}
      //        className="box"
      //        onclick={props.toggle}
  ))

  return (
    <main>
      {squareElements}
    </main>
  )
}

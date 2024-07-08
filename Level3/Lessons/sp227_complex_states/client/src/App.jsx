import React from 'react'
import './App.css'

export default function App() {
  const [thingsArray, setThingsArray] = React.useState(["Thing 1", "Thing 2"])

  /*uses spread operator and arrays. return need to be added as it was being put on a new line.*/
  function addItem() {
    setThingsArray( prevThinsArray => {
      return [...prevThinsArray, `Thing ${prevThinsArray.length + 1}`]
    })
  }

  const thingsElements = thingsArray.map(thing => <p key={thing}>{thing}</p>)

  return (
    <div className='container'>
      <div className='lesson-title'>
        <h1 className='header-title'>Complex States Lesson</h1>
        <div className='things-button'>
          <button onClick={addItem}>Add an Item!</button>
            <div className='thinsarray-text'>
              {thingsElements}
            </div>
        </div>   
      </div>
    </div>
  )
}
import React from 'react';
import './App.css'

export default function App() {
  const [things, setThings] = React.useState(["Things 1", "Things 2"])
  
  function addAnItem() {
  const newThingText = `Things ${things.length + 1}`
  setThings(prevState => [...prevState, newThingText])
  }

  const thingsElements = things.map(thing => <p key={thing}>{thing}</p>)
  return (
    <>
      <div>
        <button onClick={addAnItem}>Add an Item.</button> 
        {thingsElements}     
      </div>     
    </>
  )
}
import React from 'react'
import './App.css'

export default function App() {
  const [starWarsData, setStarWarsData] = React.useState({})
  const [count, setCount] = React.useState(1)

  React.useEffect(function() {
    /*using template string method fetch(`xxxx${count}`) it grabs the next set of datapoints from the api. --in this case from starwars api.*/
    fetch(`https://swapi.dev/api/people/${count}`)
      .then(res => res.json())
      .then(data => setStarWarsData(data))
  }, [count])

  return (
    <div>
      <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
      <h2>The count is: {count}</h2>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>Get next character</button>
    </div>
  )
}

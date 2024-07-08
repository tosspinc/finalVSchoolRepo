import React from 'react'
import './App.css'
import Numbs from './Numbs'
import Colors from './Colors'
import Jokes from './Jokes'
import JokesData from './JokesData'


export default function App() {
  const jokeElements = JokesData.map(joke  => (
    <Jokes
      key={joke.setup}
      setup={joke.setup}
      punchline={joke.punchline}
    />  
  ))
  
  return (
    <div>
      <Colors />
      <Numbs />
      {jokeElements}
    </div>
  )
}
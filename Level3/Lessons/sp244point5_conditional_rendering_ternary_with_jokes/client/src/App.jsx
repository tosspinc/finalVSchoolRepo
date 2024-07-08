import { useState } from 'react'
import Joke from './components/Joke'
import jokesData from './components/jokesData'
import './App.css'

export default function App() {
  const jokeElements = jokesData.map(joke => {
    return (
      <Joke
        key={joke.id}
        setup={joke.setup}
        punchline={joke.punchline}
      />
    )
  })
  return (
    <div>
      {jokeElements}
    </div>
  )
}

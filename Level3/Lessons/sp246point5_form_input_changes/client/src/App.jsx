import { useState } from 'react'
import Form from './components/Form'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Form />

    </>
  )
}

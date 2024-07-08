import React, { useState } from 'react'
import './App.css'

export default function App() {
  const [messages, setMessages] = React.useState(['a', 'b'])
     
  return (
    <div>
      {
        messages.length > 0 &&
        <h1>You have {messages.length} unread messages!</h1>
      }
    </div>
  )
}

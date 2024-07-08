import React, { useState } from 'react'
import './App.css'

export default function App() {
  const [messages, setMessages] = React.useState(['a', 'b'])
     
  return (
    <div>
      {
        messages.length === 0 ?
          /*if there is nothing in the array brackets then you will get the first h1.*/
          <h1>You are all caught up!</h1> :
          /*by using the {} it checks to see if there is message data to be read. if the array is empty no messages will be displayed*/
          /*if the array has on data point it will show one unread message, if two data points in array it will show 2 unread messages, etc.*/
          <h1>You have {messages.length} unread {messages.length > 1 ? 'messages' : 'message'}</h1>
      }
    </div>
  )
}

import React from 'react'
import { useState } from 'react'
import Star from './components/Star'
import './App.css'

export default function App() {
  const [contact, setContact] = useState({
    firstName: "Arnold",
    lastName: "Jones",
    phone: "+1 (801) 347-5153",
    email: "arnold.matthew.jones@gmail.com",
    isFavorite: false
  })

  function toggleFavorite() {
    setContact(prevContact => ({
      ...prevContact,
      isFavorite: !prevContact.isFavorite
    }))
  }

  return (
    <main>
      <article className='card'>
        <img src='../imgs/Matt-Jones-Headshot.jpg' className='card--image' />
        <div className='card--info'>
          <Star isFilled={contact.isFavorite} handleClick={toggleFavorite} />
          <h2 className='card-name'>
            {contact.firstName} {contact.lastName}
            <p className='card--contact'>{contact.phone}</p>
            <p className='card--contact'>{contact.email}</p>
          </h2>
        </div>
      </article>
    </main>
  )
}

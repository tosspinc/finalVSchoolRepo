import React from 'react'
import './App.css'

export default function App() {

  const [contact, setContact] = React.useState({
    firstName: "Arnold",
    lastName: "Jones",
    phone: "+1 (801) 347-5153",
    email: "arnold.matthew.jones@gmail.com",
    isFavorite: "false"
  })

  let starIcon = contact.isFavorite ? '../imgs/star.jpg' : '../imgs/star-empty.png'
  
  function toggleFavorite() {
    console.log(toggleFavorite)
}

  return ( <main>
    <article className='card'>
        <img src="./imgs/Matt-Jones-Headshot.jpg" className='card--image' />
        <div className='card--info'>
            <img src={`./imgs/${starIcon}`} 
            className='card--favorite' 
            onClick={toggleFavorite}
            />
            <h2 className='card--name'>
                {contact.firstName} {contact.lastName}
            </h2>
            <p className='card--contact'>{contact.phone}</p>
            <p className='card--contact'>{contact.email}</p>
        </div>
    </article>
</main>
  )
}
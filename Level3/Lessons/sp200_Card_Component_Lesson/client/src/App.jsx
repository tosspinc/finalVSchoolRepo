import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Card from './components/Cards'
import data from './data'
import './App.css'

export default function App() {
  // <Hero />
  const cards = data.map(item => {
    return (
      <Card 
        key={item.id}
        {...item}
      />
    )
  })

  return (
    <div>
      <Navbar />
      <section className='cards-list'>
        {cards}    
      </section>   
    </div>
  )
}

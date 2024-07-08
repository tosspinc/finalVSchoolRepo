import React from 'react'
import './App.css'
import Contact from './Contact'

function App() {
  return (
    <div className='contacts'>
      <Contact 
        img ='./src/imgs/mr-whiskerson.jpg'
        name='Mr. Whiskerson'
        phone='(212) 555-1234'
        email='mr.whiskerson@catnap.com'
      />
      <Contact 
        img ='./src/imgs/fluffykins.jpg'
        name='Fluffykins'
        phone='(212) 555-2345'
        email='fluffykins@catnap.com'
      />
      <Contact 
        img ='./src/imgs/felix.jpg'
        name='Felix'
        phone='(212) 555-4567'
        email='felix@catnap.com'
      />
      <Contact 
        img ='./src/imgs/pumpkin.jpg'
        name='Pumpkin'
        phone='(800) cat-king'
        email='pumpkin@catnap.com'
      />
    </div>
  )  
}
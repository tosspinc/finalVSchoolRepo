import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { TosspiWebsite } from './context/TosspiContext.jsx'
import { ShoppingCartProvider } from './context/ShoppingCartContext.jsx'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <TosspiWebsite>
        <ShoppingCartProvider>
          <App />
        </ShoppingCartProvider>
      </TosspiWebsite>
    </Router>
  </StrictMode>
)
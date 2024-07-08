import React, { StrictMode } from 'react'
import {createRoot} from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { BooksProvider } from './context/BooksContext.jsx'
import { PetsProvider } from './context/PetsContext.jsx'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
      <Router>
        <PetsProvider>
          <BooksProvider>
            <App />
          </BooksProvider>
        </PetsProvider>
      </Router>
    </StrictMode>
)
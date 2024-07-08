import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './context/userContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
      <Router>
        <UserProvider>
          <App />
        </UserProvider>
      </Router>  
    </StrictMode>
);

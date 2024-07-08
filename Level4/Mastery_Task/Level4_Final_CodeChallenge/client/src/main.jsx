import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider >
      <Router>
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>,
)

import './App.css';
import React from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import {ThemeContextProvider} from './ThemeContext';
import SubmitImg from './pages/SubmitImg';
import History from './pages/History';

function App(props) {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          <Route index element={<SubmitImg />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
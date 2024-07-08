import React from "react";
import './App.css';

export default function App() {
    const [isImportant, setIsImportant] = React.useState('Yes')

    function handleClick() {
      setIsImportant("No")
    }

    return (
      <div className="container">
        <h1 className="container--title">Is state important to know?</h1>
        <div className="container--value" onClick={handleClick}>
          <h1>{isImportant}</h1>
        </div>
      </div>
     )
}
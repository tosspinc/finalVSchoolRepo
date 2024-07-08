import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

export default function App() {
  const [data, setData ] = useState([]);

  useEffect(() => {
    axios.get("/api/sorted")
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
  }, []);

  return (
    <div>
      <h2>Sorted People</h2>
      <ul>
        {data.map(person => (
          <li key={person.name}>{person.name} - Age: {person.age}</li>
        ))}
      </ul>
    </div>
  );
}

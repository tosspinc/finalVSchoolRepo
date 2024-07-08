import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import PetsContext from "../context/PetsContext";
import "../cssFiles/pets.css";

export default function Pets() {
  const { pets } = useContext(PetsContext);

  return (
    <div className="pets-row">
      <div className="pets-search-container">
        <h1>Pet Products</h1>
        <div className="pets-grid">
          {pets.slice(0, 24).map(pet => (
            <div key={pet._id} className="pets-card">
              <img src={pet.imageUrl} alt={pet.title} />
              <h2>{pet.title}</h2>
              <p className="description">{pet.description}</p>
              <p className="price">Price: ${pet.price}</p>
              <p>Likes: {pet.likes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useContext } from "react";
import TosspiContext from "../context/TosspiContext";
import InventoryItem from "./InventoryItem";
import "../cssFiles/pets.css";

export default function Pets() {
  const {inventory} = useContext(TosspiContext)
  const pets = inventory.filter(item => item.category === 'Pet Product')

  return (
    <div className="pets-row">
      <div className="pets-search-container">
        <h1>Pet Products</h1>
        <div className="pets-grid">
          {pets.map(pet => (
            <InventoryItem item={pet} key={pet._id}/>
          ))}
        </div>
      </div>
    </div>
  );
}

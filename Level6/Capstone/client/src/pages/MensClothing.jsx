import React, { useContext } from "react";
import TosspiContext from "../context/TosspiContext";
import InventoryItem from "./InventoryItem";
import "../cssFiles/mensclothing.css";

export default function MensClothing() {
  const { inventory } = useContext(TosspiContext);
  const mensClothing = inventory.filter(item => item.category === 'Mens Clothing');

  return (
    <div className="mensclothing-row">
      <div className="mensclothing-search-container">
        <h1>Men's Clothing</h1>
        <div className="mensclothing-grid">
          {mensClothing.map(mensClothing => (
            <InventoryItem item={mensClothing} key={mensClothing._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

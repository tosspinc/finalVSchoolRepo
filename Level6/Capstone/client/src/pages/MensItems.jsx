import React, { useContext } from "react";
import TosspiContext from "../context/TosspiContext";
import InventoryItem from "./InventoryItem";
import "../cssFiles/mensitems.css";

export default function MensItems() {
  const { inventory } = useContext(TosspiContext);
  const mensItems = inventory.filter(item => item.category === 'Mens Items');

  return (
    <div className="mens-items-row">
      <div className="mens-items-search-container">
        <h1>Men's Items</h1>
        <div className="mens-items-grid">
          {mensItems.map(mensItems => (
            <InventoryItem item={mensItem} key={mensItem._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

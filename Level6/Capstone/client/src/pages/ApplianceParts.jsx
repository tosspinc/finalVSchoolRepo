import React, { useContext } from "react";
import "../cssFiles/applianceparts.css"
import TosspiContext from "../context/TosspiContext";
import InventoryItem from "./InventoryItem";

export default function ApplianceParts() {
  const { inventory } = useContext(TosspiContext);

  const applianceParts = inventory.filter(item => item.category === 'Appliance Part')

  return (
    <div className="appliance-parts-row">
      <div className="appliance-parts-search-container">
        <h1>Appliance Parts</h1>
        <div className="appliance-parts-grid">
          {applianceParts.map(part => (
            <InventoryItem item={part} key = {part._id}/>
          ))}
        </div>
      </div>
    </div>
  );
}

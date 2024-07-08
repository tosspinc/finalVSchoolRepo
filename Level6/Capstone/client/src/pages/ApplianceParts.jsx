import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import AppliancePartContext from "../context/TosspiContext";
import "../cssFiles/applianceparts.css"

export default function ApplianceParts() {
  const { applianceParts } = useContext(AppliancePartContext);

  return (

    <div className="appliance-parts-row">
      <div className="appliance-parts-search-container">
        <h1>Appliance Parts</h1>
        <div className="appliance-parts-grid">
          {applianceParts.slice(0, 24).map(part => (
            <div key={part._id} className="appliance-parts-card">
              <img src={part.imageUrl} alt={part.title} />
              <h2>{part.title}</h2>
              <p className="appliance-parts-description">{part.description}</p>
              <p className="appliance-parts-price">Price: ${part.price}</p>
              <p>Likes: {part.likes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import ApplianceContext from "../context/TosspiContext";
import "../cssFiles/appliance.css";

export default function Appliance() {
  const { Appliance } = useContext(ApplianceContext);

  //if (!Appliance) return <div>Loading...</div>;

  return (

    <div className="appliance-row">
      <div className="appliance-search-container">
        <h1>Appliance Items</h1>
        <div className="appliance-grid">
          {Appliance.slice(0, 24).map(appliance => (
            <div key={appliance._id} className="appliance-card">
              <img src={appliance.imageUrl} alt={appliance.title} />
              <h2>{appliance.title}</h2>
              <p className="description">{appliance.description}</p>
              <p className="price">Price: ${appliance.price}</p>
              <p>Likes: {appliance.likes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

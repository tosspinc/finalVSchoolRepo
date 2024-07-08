import React, { createContext, useState, useEffect } from "react";

const TosspiContext = createContext();

export const TosspiWebsite = ({ children }) => {
  const [Appliance, setAppliance] = useState([]);

  useEffect(() => {
    fetch('/api/appliance')
      .then(response => response.json())
      .then(data => setAppliance(data))
      .catch(error => console.error("Error fetching appliance item: ", error));
  }, []);

  return (
    <TosspiContext.Provider value={{ Appliance, setAppliance }}>
      {children}
    </TosspiContext.Provider>
  );
};

export default TosspiContext;


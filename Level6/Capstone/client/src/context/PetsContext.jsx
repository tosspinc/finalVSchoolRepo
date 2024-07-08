import React, { createContext, useState, useEffect } from "react";

const PetsContext = createContext();

export const PetsProvider = ({ children }) => {
  const [pets, setPets] = useState([])

  useEffect(() => {
    fetch('/api/pets')
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error("Error fetching pet products: ", error))
  }, [])

  return (
    <PetsContext.Provider value={{ pets, setPets}}>
      {children}
    </PetsContext.Provider>
  );
}

export default PetsContext


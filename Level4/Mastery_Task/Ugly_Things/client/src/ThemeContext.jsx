import React, { useState, useEffect } from 'react';

const ThemeContext = React.createContext();

function ThemeContextProvider(props) {
  const [uglyThings, setUglyThings] = useState([]);

  useEffect(() => {
    fetch('https://api.vschool.io/arnoldjones/thing')
      .then(response => response.json())
      .then(data => setUglyThings(data))
      .catch(error => console.error('Error retrieving ugly things:', error));
  }, []);

      const addUglyThing = (todo) => {
    // const newUglyThing = {
    //   imgUrl,
    //   title,
    //   description,
    // };

    fetch('https://api.vschool.io/arnoldjones/thing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then(response => response.json())
      .then(data => setUglyThings(prevThings => [...prevThings, data]))
      .catch(error => console.error('Error adding new ugly thing:', error));
  };

  const deleteUglyThing = (id) => {
    fetch(`https://api.vschool.io/arnoldjones/thing/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUglyThings(prevThings => prevThings.filter(item => item._id !== id));
      })
      .catch(error => console.error('Error deleting ugly thing:', error));
  };

  const editUglyThing = (id, updatedTitle, updatedDescription) => {
    const updatedUglyThing = {
      title: updatedTitle,
      description: updatedDescription,
    };

    fetch(`https://api.vschool.io/arnoldjones/thing/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUglyThing),
    })
      .then(() => {
        setUglyThings(prevThings => {
          const updatedThings = [...prevThings];
          const thingIndex = updatedThings.findIndex(thing => thing._id === id);
          updatedThings[thingIndex].title = updatedTitle;
          updatedThings[thingIndex].description = updatedDescription;
          return updatedThings;
        });
      })
      .catch(error => console.error('Error updating ugly thing:', error));
  };

  return (
    <ThemeContext.Provider value={{ uglyThings, addUglyThing, deleteUglyThing, editUglyThing }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
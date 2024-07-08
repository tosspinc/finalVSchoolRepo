import React, { createContext, useState, useEffect } from "react";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("Error fetching books: ", error))
  }, [])

  return (
    <BooksContext.Provider value={{ books, setBooks}}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksContext


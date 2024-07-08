import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import BooksContext from "../context/BooksContext";
import "../cssFiles/books.css"

export default function Books() {
    const { books } = useContext(BooksContext)

    return (
        <div className="books-row">
            <div className="books-search-container">
                <h1>Books</h1>
                <div className='books-grid'>
                    {books.slice(0, 24).map(book => (
                        <div key={book._id} className="book-card">
                            <img src={book.imageUrl} alt={book.title} className="book-image" />
                            <h2 className="book-title">{book.title}</h2>
                            <p className="book-description">{book.description}</p>
                            <p className="book-price">Price: ${book.price}</p>
                            <p className="book-likes">Likes: {book.likes}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
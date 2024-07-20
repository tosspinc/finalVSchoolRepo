import React, { useContext } from "react";
import TosspiContext from "../context/TosspiContext";
import "../cssFiles/books.css"
import InventoryItem from "./InventoryItem";

export default function Books() {
    const { inventory } = useContext(TosspiContext);

    const books = inventory.filter(item => item.category === 'Book')

    return (
        <div className="books-row">
            <div className="books-search-container">
                <h1>Books</h1>
                <div className='books-grid'>
                    {books.map(book => (
                        <InventoryItem key={book._id} item={book}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom"

export default function BookDetail() {
    const { id } = useParams()
    const [book, setBook] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/books/${id}`)
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(error => console.error('Error fetching book: ', error))
    }, [id])

    if (!book) return <div>Loading...</div>

    return (
        <div className="book-detail">
            <img src={book.imageUrl} alt={book.title} />
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <p>genre: {book.genre}</p>
            <p>Year Published: {book.yearPublished}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Pages: {book.pages}</p>
            <p>Cover: {book.cover}</p>
            <p>Price: {book.price}</p>
            <p>Likes: {book.likes}</p>
        </div>
    )
}
const express = require('express')
const bookRouter = express.Router()
//const { findById, findByIdAndDelete } = require('../models/todo')
const Book = require('../models/book.js')
const book = require('../models/book.js')

//get all
bookRouter.get("/", async (req, res, next) => {
    try {
        const allBooks = await Book.find()
        return res.status(200).send(allBooks)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


//get list of books by author
bookRouter.get('/:authorID', async (req, res, next) => {
    try {
        const books = await Book.find({ author: req.params.authorID })
        if (!books.length) {
            return res.status(404).send({ message: 'No books found by this author' })
        }  
        return res.status(200).send(books)  
    } catch(error) {
        res.status(500)
        return next(error)
    }
})

//post to mongoose
bookRouter.post('/:authorID', async (req, res, next) => {
    try {
        req.body.author = req.params.authorID
        const newBook = new Book(req.body)
        const savedBook = await newBook.save()
        return res.status(201).send(savedBook)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//put - edit request
bookRouter.put('/:id', async (req, res, next) => {
    try {
       const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true} 
       )
       return res.status(200).send(updatedBook)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//delete
bookRouter.delete("/:id", async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        return res.status(200).send(`You have deleted ${deletedBook.title}`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//updating the customer likes for a book
bookRouter.put("/likes/:bookID", async (req, res, next) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.bookID,
            { $inc: { likes: 1} },
            { new: true},
        )
        if (!updatedBook) {
            return res.status(404).send( { message: 'Book not found' })
        }
        return res.status(200).send(updatedBook)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


module.exports = bookRouter
const express = require('express')
const authorRouter = express.Router()
//const { findById, findByIdAndDelete } = require('../models/todo')
const Author = require('../models/author.js')


//get all
authorRouter.get("/", async (req, res, next) => {
    try {
        const allAuthors = await Author.find()
        return res.status(200).send(allAuthors)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//get author(s) by search for name
authorRouter.get("/search", async (req, res, next) => {
    try {
        const authorName = req.query.author
        if (typeof authorName !== 'string' || !authorName.trim()) {
            return res.status(400).send({ message: "Invalid author name"})
        }    
        const authors = await Author.find({ name: { $regex: authorName, $options: 'i' } })
        if (authors.length === 0) {
            return res.status(404).send( { message: 'No authors found'})
        }
        return res.status(200).send(authors)        
        }
    catch (error) {
        res.status(500)
        return next(error)
    }
})

//get author by id
authorRouter.get("/:authorID", async (req, res, next) => {
    try {
        const author = await Author.findById(req.params.authorID)
        if (!author) {
            return res.status(404).send({ message: "Author not found" })
        } 
        return res.status(200).send(author)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//post to mongoose
authorRouter.post("/", async (req, res, next) => {
    try {   
        const newAuthor = new Author(req.body)
        const savedAuthor = await newAuthor.save()
        return res.status(201).send(savedAuthor)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//put - edit request
authorRouter.put('/:id', async (req, res, next) => {
    try {
       const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
       )
       return res.status(200).send(updatedAuthor)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//delete
authorRouter.delete("/:id", async (req, res, next) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id)
        return res.status(200).send(`You have deleted ${deletedAuthor.title}`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})



module.exports = authorRouter
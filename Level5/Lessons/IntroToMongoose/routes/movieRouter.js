const express = require('express')
const movieRouter = express.Router()
//const { findById, findByIdAndDelete } = require('../models/todo')
const Movie = require('../models/movie')
const movie = require('../models/movie')

//get all
movieRouter.get("/", async (req, res, next) => {
    try {
        const allMovies = await Movie.find()
        return res.status(200).send(allMovies)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//get by genre
movieRouter.get('/search/genre', async (req, res, next) => {
    const genreQuery = req.query.genre
    if (!genreQuery) {
        return res.status(400).send({message: "Genre query parameter is required"})
    }
    try {   
        const moviesByGenre = await movie.find({ genre: genreQuery})
        return res.status(200).send(moviesByGenre)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


//post to mongoose
movieRouter.post('/', async (req, res, next) => {
    try {   
        const newMovie = new Movie(req.body)
        const savedMovie = await newMovie.save()
        return res.status(201).send(savedMovie)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//put - edit request
movieRouter.put('/:id', async (req, res, next) => {
    try {
       const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
       )
       return res.status(200).send(updatedMovie)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//delete
movieRouter.delete("/:id", async (req, res, next) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id)
        return res.status(200).send(`You have deleted ${deletedMovie.title}`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})



module.exports = movieRouter
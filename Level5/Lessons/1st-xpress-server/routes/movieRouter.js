const express = require('express')
const movieRouter = express.Router()
const {v4 : uuidv4 } = require('uuid');
const { post } = require('./movieRouter');

const movies = [
    { title: "Die Hard", genre: "action", _id: uuidv4() },
    { title: "Star Wars IV", genre: "fantasy", _id: uuidv4() },
    { title: "Lion King", genre: "fantasy", _id: uuidv4() }, 
    { title: "Friday the 13th", genre: "horror", _id: uuidv4() }
];

//Get All
movieRouter.get("/", (req, res) => {
    res.send(movies)
})

//Get One
movieRouter.get("/:movieId", (req, res) => {
    const movieId = req.params.movieId
    const foundMovie = movies.find(movie => movie._id === movieId)
    res.send(foundMovie)
})


//Get by Genre.
movieRouter.get("/search/genre", (req, res) => {
    const genre = req.query.genre
    const filteredMovies = movies.filter(movie => movie.genre === genre)
    res.send(filteredMovies)    
})

//delete one
movieRouter.delete("/:movieId", (req, res) => {
    const movieId = req.params.movieId
    const movieIndex = movies.findIndex(movie => movie._id === movieId)
    movies.splice(movieIndex, 1)
    res.send("SUccessfully deleted movie!")
})

//update an item 
movieRouter.put("/:movieId", (req, res) => {
    const movieId = req.params.movieId
    const updateObject = req.body
    const movieIndex = movies.findIndex(movie => movie._id === movieId)
    const updatedMovie = Object.assign(movies[movieIndex], updateObject)
    res.send(updatedMovie)
})



// //routes //
// movieRouter.get("/", (req, res) => {
//     res.send(movies)
// })

// movieRouter.post("/", (req, res) => {
//     const newMovie = req.body
//     newMovie._id = uuidv4()
//     movies.push(newMovie)
//     res.send(`Successfully added ${newMovie.title} to the database.`)
// })

//alternative method from above.
// movieRouter.route("/")
//     .get((req, res) => {
//         res.send(movies)
//     })
//     .post((req, res) => {
//         const newMovie = req.body
//         newMovie._id = uuidv4()
//         movies.push(newMovie)
//         res.send(`Successfully added ${newMovie.title} to the database.`)
//     })


module.exports = movieRouter
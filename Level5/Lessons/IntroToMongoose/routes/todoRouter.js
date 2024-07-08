const express = require('express')
const todoRouter = express.Router()
//const { findById, findByIdAndDelete } = require('../models/todo')
const Todo = require('../models/todo')


//post to mongoose
todoRouter.post('/', async (req, res, next) => {
    try {   
        const newTodo = new Todo(req.body)
        const savedTodo = await newTodo.save()
        return res.status(201).send(savedTodo)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//get all
todoRouter.get("/", async (req, res, next) => {
    try {
        const allTodos = await Todo.find()
        return res.status(200).send(allTodos)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//put - edit request
todoRouter.put('/:id', async (req, res, next) => {
    try {
       const updatedTodo = Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
       )
       return res.status(201).send(updatedTodo)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//delete
todoRouter.delete("/:id", async (req, res, next) => {
    try {
        const deletedTodo = await findByIdAndDelete(req.params.id)
        return res.status(201).send(`You have deleted ${deletedTodo.title}`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = todoRouter
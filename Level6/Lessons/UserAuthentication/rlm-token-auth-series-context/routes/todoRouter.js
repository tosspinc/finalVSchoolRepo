const express = require("express")
const todoRouter = express.Router()
const Todo = require('../models/todo.js')

// Get All Todos
todoRouter.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find()
    return res.status(200).send(todos)  
  } catch (error) {
      res.status(500).send({ error: 'Internal Server Error'})
      return next(error)
  }
})

// Add new Todo
todoRouter.post("/", async (req, res, next) => {
  try {
    const newTodo = new Todo(req.body)
    const savedTodo = await newTodo.save()
    return res.status(201).send(savedTodo)  
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error'})
    return next(error)
  }
})

// Delete Todo
todoRouter.delete("/:todoId", async (req, res, next) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({_id: req.params.todoId})
    if (!deletedTodo) {
      res.status(404)
      return next(new Error("Todo not found."))
    }
    return res.status(200).send(`Successfully deleted todo: ${deletedTodo.title}`)
  } catch (error) {
      res.status(500).send({ error: 'Internal Server Error'})
      return next(error)
  }
})

// Update Todo
todoRouter.put("/:todoId", (req, res, next) => {
  try {
  const updatedTodo = Todo.findOneAndUpdate (
    { _id: req.params.todoId },
    req.body,
    { new: true}
  )
  if (!updatedTodo) {
    res.status(404)
    return next(new Error("Todo not found"))
  }
  return res.status(200).send(updatedTodo)
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error'})
    return next(error)
  }
})

module.exports = todoRouter
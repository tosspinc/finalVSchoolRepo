const express = require('express');
const { v4: uuidv4 } = require("uuid");
const todoListRouter = express.Router();

const todoList = [
    {
        "name": "Dishes",
        "description": "Rinse and place dishes in dishwasher.",
        "imageURL": "https://lemonblossomcleaning.com/wp-content/uploads/2019/04/how-to-wash-dishes-fast.jpeg",
        "completed": false,
        _id: uuidv4()
    },
    {
        "name": "Laundry",
        "description": "Wash laundry in house",
        "imageURL": "https://images.ctfassets.net/ajjw8wywicb3/7FmJC0yRrvfmxEkg0FAujA/2fc0d9df8fb6bbdc82a4ac1067a5d760/HOW_TO_WASH_CLOTHES_The_art_of_washing_different_fabric_370x320.jpg",
        "completed": false,
        _id: uuidv4()
    },
    {
        "name": "Grocery Shopping",
        "description": "Go shopping for Groceries.",
        "imageURL": "https://anchorridge.org/wp-content/uploads/2020/05/Bag-Of-Groceries-1.png",
        "completed": false,
        _id: uuidv4()
    },
    {
        "name": "Walk pets",
        "description": "Take the pets for a walk.",
        "imageURL": "https://images.template.net/111430/free-dog-walking-clipart-bqdjv.png",
        "completed": false,
        _id: uuidv4()
    },
    {
        "name": "Clean House",
        "description": "Vacuum and clean the house.",
        "imageURL": "https://cdn2.vectorstock.com/i/1000x1000/43/06/clean-house-cartoon-flat-vector-33024306.jpg",
        "completed": false,
        _id: uuidv4()
    }
];

// Get one by ID
todoListRouter.get("/:toDoListId", (req, res) => {
    const toDoListId = req.params.toDoListId;
    const foundToDo = todoList.find(list => list._id === toDoListId);

    if (!foundToDo) {
        return res.status(404).send("Todo list not found");
    }

    res.send(foundToDo);
});

// Update one
todoListRouter.put("/:toDoListId", (req, res) => {
    const toDoListId = req.params.toDoListId;
    const updateList = req.body;
    const listIndex = todoList.findIndex(list => list._id === toDoListId);
    
    if (listIndex === -1) {
        return res.status(404).send("Todo list not found");
    }
    
    const updatedToDoList = { ...todoList[listIndex], ...updateList };
    todoList[listIndex] = updatedToDoList;

    res.send(updatedToDoList);
});

// Delete one
todoListRouter.delete("/:toDoListId", (req, res) => {
    const toDoListId = req.params.toDoListId;
    const listIndex = todoList.findIndex(list => list._id === toDoListId);
    
    if (listIndex === -1) {
        return res.status(404).send("Todo list not found.");
    }

    todoList.splice(listIndex, 1);
    res.send("Successfully deleted list item!");
});

// Get all and create new
todoListRouter.route("/")
    .get((req, res) => {
        res.send(todoList);
    })
    .post((req, res) => {
        const newToDoList = req.body;
        newToDoList._id = uuidv4();
        todoList.push(newToDoList);
        res.send(`Successfully added ${newToDoList.name} to the database.`);
    });

module.exports = todoListRouter;

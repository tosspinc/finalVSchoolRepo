const express = require("express");
const { v4 : uuidv4 } = require("uuid");
const thingFinderRouter = express.Router();

//data
const thingFinder = [
    {
        "type": "banana",
        "brand": "Chiquita",
        "price": ".65",
        _id: uuidv4()
    },
    {
        "type": "Apple",
        "brand": "Gala",
        "price": ".79",
        _id: uuidv4()
    },
    {
        "type": "Orange",
        "brand": "Naval",
        "price": ".99",
        _id: uuidv4()
    }
]

//routes
thingFinderRouter.get("/fruit", (req, res) => {
    const type = req.query.type
    const foundThing = thingFinder.filter(thing => thing.type.toLowerCase() === type)
    if (foundThing.length > 0) {
        res.send(foundThing)
    } else {
        res.status(404).send(`No Items of type ${type} found.`)
    }
})

thingFinderRouter.get("/:thingFinderId", (req, res) => {
    const thingFinderId = req.params.thingFinderId
    const foundThing = thingFinder.find(thing => thing._id === thingFinderId)
    if (foundThing) {
        res.send(foundThing)
    } else {
        res.status(404).send("Item not found")
    }
})

thingFinderRouter.route("/")
    .get((req, res) => {
        res.send(thingFinder)
    })

    .post((req, res) => {
        const newThingFinder = req.body
        newThingFinder._id = uuidv4()
        thingFinder.push(newThingFinder)
        res.send(`Successfully added ${newThingFinder.type} to the database.`)
    })

module.exports = thingFinderRouter
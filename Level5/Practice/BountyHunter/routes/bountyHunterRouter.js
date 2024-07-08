const express = require('express');
const { v4: uuidv4 } = require("uuid");
const bountyHunterRouter = express.Router();

const bountyHunter = [
    {
        fName: "John",
        lName: "Smith",
        living: true,
        bountyAmt: 10000,
        type: "sith",
        _id: uuidv4()
    },
    {
        fName: "Jane",
        lName: "Doe",
        living: true,
        bountyAmt: 1000,
        type: "jedi",
        _id: uuidv4()
    },
    {
        fName: "Luke",
        lName: "Skywalker",
        living: true,
        bountyAmt: 100000,
        type: "jedi",
        _id: uuidv4()
    },
    {
        fName: "Sandra",
        lName: "Bullock",
        living: true,
        bountyAmt: 250000,
        type: "sith",
        _id: uuidv4()
    }
];

// Update one
bountyHunterRouter.put("/:bountyHunterId", (req, res) => {
    const bountyHunterId = req.params.bountyHunterId;
    const updateBounty = req.body;
    const bountyIndex = bountyHunter.findIndex(bounty => bounty._id === bountyHunterId);
    
    if (bountyIndex === -1) {
        return res.status(404).send("Bounty Hunter not found");
    }
    
    const updatedBountyHunter = { ...bountyHunter[bountyIndex], ...updateBounty };
    bountyHunter[bountyIndex] = updatedBountyHunter;

    res.send(updatedBountyHunter);
});

//delete one
bountyHunterRouter.delete("/:bountyHunterId", (req, res) => {
    const bountyHunterId = req.params.bountyHunterId;
    const bountyIndex = bountyHunter.findIndex(bounty => bounty._id === bountyHunterId)
    bountyHunter.splice(bountyIndex, 1)
    res.send("successfully deleted bounty!")
})

// Get all and create new
bountyHunterRouter.route("/")
    .get((req, res) => {
        res.send(bountyHunter);
    })
    .post((req, res) => {
        const newBountyHunter = req.body;
        newBountyHunter._id = uuidv4();
        bountyHunter.push(newBountyHunter);
        res.send(`Successfully added ${newBountyHunter.fName} ${newBountyHunter.lName} to the database.`);
    });

module.exports = bountyHunterRouter;

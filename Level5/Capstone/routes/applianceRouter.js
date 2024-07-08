express = require('express')
const applianceRouter = express.Router()
const Appliance = require('../models/appliance')
//const { findById, findByIdAndDelete } = require('../models/todo')



//get all
applianceRouter.get("/", async (req, res, next) => {
    try {
        const allAppliance = await Appliance.find()
        return res.status(200).send(allAppliance)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


//post to mongoose
applianceRouter.post('/', async (req, res, next) => {
    try {
        const newAppliance = new Appliance(req.body)
        const savedAppliance = await newAppliance.save()
        return res.status(201).send(savedAppliance)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//put - edit request
applianceRouter.put('/:id', async (req, res, next) => {
    try {
    const updatedAppliance = await Appliance.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true} 
    )
    return res.status(200).send(updatedAppliance)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//delete
applianceRouter.delete("/:id", async (req, res, next) => {
    try {
        const deletedAppliance = await Appliance.findByIdAndDelete(req.params.id)
        return res.status(200).send(`You have deleted ${deletedAppliance.title}`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//updating the customer likes for an appliance part
applianceRouter.put("/likes/:applianceID", async (req, res, next) => {
    try {
        const updatedAppliance = await Appliance.findByIdAndUpdate(
            req.params.applianceID,
            { $inc: { likes: 1} },
            { new: true},
        )
        if (!updatedAppliance) {
            return res.status(404).send( { message: 'Appliance item not found' })
        }
        return res.status(200).send(updatedAppliance)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


module.exports = applianceRouter
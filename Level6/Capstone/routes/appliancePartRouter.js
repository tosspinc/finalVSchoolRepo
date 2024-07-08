express = require('express')
const appliancePartRouter = express.Router()
const AppliancePart = require('../models/appliancePart')
//const { findById, findByIdAndDelete } = require('../models/todo')



//get all
appliancePartRouter.get("/", async (req, res, next) => {
    try {
        const allAppliance = await AppliancePart.find()
        return res.status(200).send(allAppliance)
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error"})
        return next(error)
    }
})


//post to mongoose
appliancePartRouter.post('/', async (req, res, next) => {
    try {
        const newAppliancePart = new AppliancePart(req.body)
        const savedAppliancePart = await newAppliancePart.save()
        return res.status(201).send(savedAppliancePart)
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error"})
        return next(error)
    }
})

//put - edit request
appliancePartRouter.put('/:id', async (req, res, next) => {
    try {
    const updatedAppliancePart = await AppliancePart.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true} 
    )
    return res.status(200).send(updatedAppliancePart)
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error"})
        return next(error)
    }
})

//delete
appliancePartRouter.delete("/:id", async (req, res, next) => {
    try {
        const deletedAppliancePart = await AppliancePart.findByIdAndDelete(req.params.id)
        return res.status(200).send({ message: `Appliance part ${deletedAppliancePart.title} has been deleted successfully.`})
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error"})
        return next(error)
    }
})

//updating the customer likes for an appliance part
appliancePartRouter.put("/likes/:appliancePartID", async (req, res, next) => {
    try {
        const updatedAppliancePart = await AppliancePart.findByIdAndUpdate(
            req.params.appliancePartID,
            { $inc: { likes: 1} },
            { new: true},
        )
        if (!updatedAppliancePart) {
            return res.status(404).send( { message: 'Appliance part not found' })
        }
        return res.status(200).send(updatedAppliancePart)
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error"})
        return next(error)
    }
})


module.exports = appliancePartRouter
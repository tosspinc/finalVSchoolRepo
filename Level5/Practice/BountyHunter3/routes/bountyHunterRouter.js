import express from 'express'
import bounty from '../models/bounty.js'

const bountyHunterRouter = express.Router()

//post a bounty
bountyHunterRouter.post('/', async (req, res, next) => {
    try {
        const newBounty = new bounty(req.body)
        const savedBounty = await newBounty.save()
        return res.status(201).send(savedBounty)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

// Get all 
bountyHunterRouter.get("/", async (req, res, next) => {
    try {
        const allBounties = await bounty.find()
        return res.status(200).send(allBounties)
    } catch (error) {
        res.status(500)
        return next(error)
    }
});

//get a bounty by type
bountyHunterRouter.get('/search/type', async (req, res, next) => {
    const typeQuery = req.query.type
    if (!typeQuery) {
        return res.status(400).send({message: "Type query parameter is required"})
    } 
    try {
        const bountyByType = await bounty.find({ type: typeQuery })
        return res.status(200).send(bountyByType)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//edit a bounty
bountyHunterRouter.put('/:id', async (req, res, next) => {
    try {
        const updateBounty = await bounty.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        )
        return res.status(200).send(updateBounty)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//delete a bounty
bountyHunterRouter.delete('/:id', async (req, res, next) => {
    try {
        const deleteBounty = await bounty.findByIdAndDelete(req.params.id)
        return res.status(200).send(`You have deleted the ${deleteBounty.fName} bounty.`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

export default bountyHunterRouter
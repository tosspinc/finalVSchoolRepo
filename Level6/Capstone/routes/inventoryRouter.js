const express = require('express')
const inventoryRouter = express.Router()
const Inventory = require('../models/inventory')


inventoryRouter.get('/', async(req, res, next) => {
    try {
        const inventory = await Inventory.find()
        return res.status(200).send(inventory)
    } catch (err) {
       res.status(500)
       return next(err) 
    }
})

inventoryRouter.get('/:id', async (req, res, next) => {
    try {
        const product = await Inventory.findById(req.params.id)
        if (!product) {
            return res.status(404).send({ error: 'Product not found'})
        }
        res.status(200).send(product)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//add many
inventoryRouter.post('/many', async(req, res, next) => {
    try {
        const arr = req.body
        const inventoryArr = await Promise.all(arr.map( async item => {
            const newInventory = new Inventory(item)
            const savedInventory = await newInventory.save()
            return savedInventory
        }))
        return res.status(201).send(inventoryArr)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


module.exports = inventoryRouter
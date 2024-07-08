const express = require('express')
const inventoryRouter = express.Router()
const inventory = require('../models/inventory.js')

//post to mongoose
inventoryRouter.post('/', async (req, res, next) => {
    try {
        const newInventory = new inventory(req.body)
        const savedInventory = await newInventory.save()
        return res.status(201).send(savedInventory)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


//get all
inventoryRouter.get('/', async (req, res, next) => {
    try {
        const allInventory = await inventory.find()
        return res.status(200).send(allInventory)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//get one inventory item
inventoryRouter.get('/search/productName', async (req, res, next) => {
    const productNameQuery = req.params.productName
    if (!productNameQuery) {
        return res.status(400).send({message: 'ProductName query parameter is required'})
    }
    try {
        const inventoryByProductName = await inventory.find({productName: productNameQuery})
        return res.status(200).send(inventoryByProductName)
    }
    catch (error) {
        res.status(500)
        return next(error)
    }
})

//put (edit) an inventory item
inventoryRouter.put('/:id', async (req, res, next) => {
    try {
        const updatedInventory = await inventory.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        return res.status(200).send(updatedInventory)
    } catch (error) {
        res.status(500)
        return next(error)
    }
} )

//delete an inventory item
inventoryRouter.delete('/:id', async (req, res, next) => {
    try {
        const deletedInventory = await inventory.findByIdAndDelete(req.params.id)
        return res.status(200).send(`You have deleted ${deletedInventory.brand}`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = inventoryRouter
express = require('express')
const petProductRouter = express.Router()
//const { findById, findByIdAndDelete } = require('../models/petProducts.js')
const petProducts = require('../models/petProducts.js')


//get all pet products
petProductRouter.get("/", async (req, res, next) => {
    try {
        const allPetProducts = await petProducts.find()
        return res.status(200).send(allPetProducts)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


//get list of all of the pet product by Id
petProductRouter.get('/:id', async (req, res, next) => {
     try {
        const petProduct = await petProducts.findById(req.params.id)
            return res.status(200).send(petProduct)  
     } catch(error) {
        if (error.name === 'CastError') {
            return res.status(400).send({ message: 'No pet product with that ID found'})
        }
         res.status(500)
         return next(error)
     }
})

//post a new pet product to mongodb
petProductRouter.post('/', async (req, res, next) => {
    try {
      const newPetProduct = new petProducts(req.body)
      const savedPetProduct = await newPetProduct.save()
      return res.status(201).send(savedPetProduct)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//put - edit pet product listing
petProductRouter.put('/:id', async (req, res, next) => {
    try {
     const updatedPetProduct = await petProducts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true} 
    )
    return res.status(200).send(updatedPetProduct)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//delete a pet product
petProductRouter.delete("/:id", async (req, res, next) => {
    try {
        const deletedPetProduct = await petProducts.findByIdAndDelete(req.params.id)
        return res.status(200).send(`You have deleted ${deletedPetProduct.id}`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//updating the customer likes for the a pet product
petProductRouter.put("/likes/:petProductID", async (req, res, next) => {
    try {
        const updatedPetProduct = await petProducts.findByIdAndUpdate(
            req.params.petProductID,
            { $inc: { likes: 1} },
            { new: true},
        )
        if (!updatedPetProduct) {
            return res.status(404).send( { message: 'pet product not found' })
        }
        return res.status(200).send(updatedPetProduct)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})


module.exports = petProductRouter
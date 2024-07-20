const express = require('express')
const cartRouter = express.Router()
const CartItem = require('../models/cartItem')


cartRouter.get('/', async (req, res, next) => {
    try {
        const cart = await CartItem.find({userId: req.auth._id})
        return res.status(200).send(cart)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

cartRouter.post('/', async (req, res, next) => {
    try {
        req.body.userId = req.auth._id
        const newCartItem = new CartItem(req.body)
        const savedCartItem = await newCartItem.save()
        return res.status(201).send(savedCartItem)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = cartRouter
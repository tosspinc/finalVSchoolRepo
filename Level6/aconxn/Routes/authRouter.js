const express = require('express')
const authRouter = express.Router()
const username = require('../models/user')
const jwt = require('jsonwebtoken')
const userName = require('../models/user')


//user signup
authRouter.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body
        console.log('Signup request received with: ', { username, password })

        const lowerCaseUsername = username.toLowerCase()

        //check if user already exists.
        const existingUser = await userName.findOne({ username: lowerCaseUsername })
        if (existingUser) {
            console.log('Username already exists.', lowerCaseUsername())
            res.status(403)
            return next(new Error('That Username is already taken.'))
        }

        //create new user
        const newUser = new userName({ username: lowerCaseUsername, password })
        const savedUser = await newUser.save()

        //generate JWT Token
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        console.log('User created and token generated.', {user: savedUser.withoutPassword(), token})

        return res.status(201).send({user: savedUser.withoutPassword(), token})
    } catch (error) {
        console.error('Error signing up.', error)
        res.status(500)
        return next(error)
    }
})
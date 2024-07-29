const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')


//user signup
authRouter.post('/signup', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (user){
            res.status(403)
            return next(new Error ('Username is already taken.'))
        }
        
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        
        //generate JWT Token
        const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
        return res.status(201).send({ user: savedUser, token })
    } catch (error) {
        console.error('Error signing up.', error)
        res.status(500)
        return next(error)
    }
})

authRouter.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        console.log(req.body.username)
        if (!user){
            res.status(403)
            return next(new Error('Incorrect Username.'))
        }
        const isMatch = await user.checkPassword(req.body.password)
        if (!isMatch){
            console.log(user.password)
            console.log(req.body.password)
            res.status(403)
            return next(new Error('Incorrect Password.'))
        }
        const token = jwt.sign(user.toObject(), process.env.SECRET)
        return res.status(201).send({user, token, redirect: '/current-issues'})   
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = authRouter
const express = require('express')
const  userNameRouter = express.Router()
const UserName =  require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//get all users
UserRouter.get('/', async (req, res, next) => {
    try {
        const allUserNames = await UserName.find() 
        return res.status(200).send(allUserNames)
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error'})
        return next(error)
    }
})

//creates a new user
UserRouter.post('/signup', async (req, res, next) => {
    try {
        const { userName, password } = req.body

        //checks if userName is already in use.
        const existingUser = await UserName.findOne({ userName: userName.toLowerCase() })
        if (existingUser) {
            return res.status(403).send({ error: "That userName is already being used." })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUserName = new UserName({ userName: userName.toLowerCase(), password: hashedPassword })
        const savedUserName = await newUserName.save()

        //generate jwt token
        const token = jwt.sign({ userName: savedUserName.userName }, process.env.SECRET)

        return res.status(201).send({ user: savedUserName.withoutPassword(), token })
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error'})
        return next(error)
    }
})

//when user signs in
userNameRouter.post('/login', async (req, res, next) => {
    try {
        const { userName, password} = req.body

        //checks if already in database.
        const user = await UserName.findOne({ userName: userName.toLowerCase() })
        if(!isMatch) {
            return res.status(403).send({ error: 'No user with your userName exists. Please, Signup.' })
        }

        //checks if passwords match.
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(403).send({ error: 'Incorrect userName or password.'})
        }

        //generate token
        const token = jwt.sign({ userName: user.userName }, process.env.SECRET)

        return res.status(200).send({ message: 'Logged in successfully.', user: user.withoutPassword(), token })
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error'})
        return next(error)
    }
})

//updates user
userNameRouter.put('/:id', async (req, res, next) => {
    try {
        const updatedUserName = await UserName.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        return res.status(200).send(updatedUserName.withoutPassword())
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error'})
        return next(error)
    }
})

//delete a user
userNameRouter.delete('/:id', async (req, res, next) => {
    try {
        const deletedUserName = await UserName.findByIdAndDelete(req.params.id)
        return res.status(200).send(`User ${deletedUserName.userName} deleted Successfully.`)
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error'})
        return next(error)
    }
})
module.exports = userNameRouter 
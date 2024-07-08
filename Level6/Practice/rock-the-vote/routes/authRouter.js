const express = require('express');
const authRouter = express.Router();
const UserName = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User login
authRouter.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await UserName.findOne({ username });
        if (!existingUser) {
            return res.status(403).send({ error: "Incorrect Username or Password"})
        }

        // Check if password matches
        existingUser.checkPassword(password, (err, isMatch) => {
             if (!isMatch) {
            return res.status(403).send({ error: "Incorrect Username or Password." })
        }
        if (err){
            res.status(403)
            return next(err)
        }
        })
        // const isMatch = await bcrypt.compare(password, existingUser.password);
        //

        // Generate token
        const token = jwt.sign(existingUser.withoutPassword(), process.env.SECRET);

        return res.status(200).send({user: existingUser.withoutPassword(), token})
    } catch (error) {
        console.error("Error logging in.", error);
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// User signup
authRouter.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await UserName.findOne({ username });
        if (existingUser) {
            res.status(403).send({ error: "Username already exists." })
        }

       
        

        const newUser = new UserName({ username, password });
        const savedUser = await newUser.save();
               
        // Generate JWT token
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);
        
        return res.status(201).send({user: savedUser.withoutPassword(), token})
    } catch (error) {
        console.error('Error signing up.', error)
        res.status(500).send({ error: 'Internal Server Error' })
        return next(error);
    }
});

// Get all users
authRouter.get('/users', async (req, res, next) => {
    try {
        const users = await UserName.find().select('-password');
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users.", error)
        res.status(500).send({ error: 'Internal Server Error' })
        return next(error);
    }
});

module.exports = authRouter;

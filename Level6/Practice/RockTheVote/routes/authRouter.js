const express = require('express');
const authRouter = express.Router();
const UserName = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// User login
authRouter.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await UserName.findOne({ username });
        if (!existingUser) {
            return res.status(403).send({ message: 'Username not found. Please sign up.' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(403).send({ message: 'Username or password are incorrect.' });
        }

        // Generate token
        const token = jwt.sign(existingUser.withoutPassword(), process.env.SECRET);
        console.log("Login response user data:", existingUser.withoutPassword());
        return res.status(200).send({ message: 'Logged in Successfully', user: existingUser.withoutPassword(), token });
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
            return res.status(403).send({ error: 'That username is already being used.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserName({ username, password: hashedPassword });
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET );

        return res.status(201).send({ user: savedUser.withoutPassword(), token });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});



module.exports = authRouter;
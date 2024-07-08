const express = require('express');
const authRouter = express.Router();
const UserName = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Gets all users
authRouter.get('/', async (req, res, next) => {
    try {
        const allUsers = await UserName.find();
        return res.status(200).send(allUsers);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

//gets current user
authRouter.get('/me', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await UserName.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error'});
        return next(error);
    }
});

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
        const token = jwt.sign({ id: existingUser._id, username: existingUser.username }, process.env.SECRET, { expiresIn: '1h' });
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
        const token = jwt.sign({ id: savedUser._id, username: savedUser.username }, process.env.SECRET, { expiresIn: '1h' });

        return res.status(201).send({ user: savedUser.withoutPassword(), token });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Update user
authRouter.put('/:id', async (req, res, next) => {
    try {
        const updateData = req.body;

        // If updating password
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedUser = await UserName.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ error: 'User not found' });
        }

        return res.status(200).send(updatedUser.withoutPassword());
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Delete user
authRouter.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await UserName.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).send({ error: 'User not found.' });
        }
        return res.status(200).send(`User ${deletedUser.username} deleted successfully.`);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

module.exports = authRouter;

const express = require('express');
const authRouter = express.Router();
const UserName = require('../models/userName');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Get all users
authRouter.get('/users', async (req, res, next) => {
    try {
        const allUserNames = await UserName.find().select('-password');
        return res.status(200).send(allUserNames);
    } catch (error) {
        console.error('Error fetching all users.', error);
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Creates a new user in mongoose
authRouter.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log('Signup request received with:', { username, password });

        const lowerCaseUsername = username.toLowerCase();

        if (!username || !password) {
            console.log('Username or password not provided');
            return res.status(400).send({ error: 'Username and password are required.' });
        }

        // Checks if username is already in use
        const existingUser = await UserName.findOne({ username: lowerCaseUsername });
        if (existingUser) {
            console.log('Username already exists:', lowerCaseUsername); // Logging
            return res.status(403).send({ error: 'That username is already being used.' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserName = new UserName({ username: lowerCaseUsername, password: hashedPassword });
        const savedUserName = await newUserName.save();

        // Generate JWT token
        const token = jwt.sign(savedUserName.withoutPassword(), process.env.SECRET);
        console.log('User created and token generated.', { user: savedUserName.withoutPassword(), token });

        return res.status(201).send({ user: savedUserName.withoutPassword(), token });
    } catch (error) {
        console.error('Error creating new user.', error);
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Login Route
authRouter.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log('Login request received with:', { username, password });

        if (!username || !password) {
            return res.status(400).send({ error: 'Username and password are required.' });
        }

        // Checks if they already exist in database
        const user = await UserName.findOne({ username: username.toLowerCase() });
        if (!user) {
            console.log('User not found:', username.toLowerCase());
            res.status(403);
            return next(new Error('No User with your username exists. Please signup.'));
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch for user:', username.toLowerCase());
            res.status(403);
            return next(new Error('Password is incorrect.'));
        }

        // Generate JWT token
        const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
        console.log('User Authenticated, token generated:', token);

        return res.status(200).send({ token, user: user.withoutPassword() });
    } catch (error) {
        console.error('Error logging in user.', error);
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Put - updates user
authRouter.put('/:id', async (req, res, next) => {
    try {
        const updatedUserName = await UserName.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(200).send(updatedUserName.withoutPassword());
    } catch (error) {
        console.error('Error updating user.', error);
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Delete a user
authRouter.delete('/:id', async (req, res, next) => {
    try {
        const deletedUserName = await UserName.findByIdAndDelete(req.params.id);
        return res.status(200).send(`User ${deletedUserName.username} deleted successfully.`);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

module.exports = authRouter;

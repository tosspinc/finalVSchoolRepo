const express = require('express');
const authRouter = express.Router();
const UserName = require('../models/userName');
const jwt = require('jsonwebtoken');

// User signup.
authRouter.post('/signup', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log('Login request received with:', { username, password });

        if (!username || !password) {
            console.log('Username or password not provided');
            return res.status(400).send({ error: 'Username and password are required.' });
        }

        const lowerCaseUsername = username.toLowerCase()

        //checks to see if username already exists.
        const existingUser = await UserName.findOne({ username: lowerCaseUsername })
        if (existingUser) {
            console.log('Username already exists:', lowerCaseUsername); 
            res.status(403)
            return next(new Error( 'That username is already taken.'));
        }

        // create new user
        const newUser = new UserName({ username: lowerCaseUsername, password })
        const savedUser = await newUser.save()

        // Generate JWT token
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);
        console.log('User created and token generated.', {user: savedUser.withoutPassword(), token});

        return res.status(201).send({ user: savedUser.withoutPassword(), token });
    } catch (error) {
        console.error('Error signing up.', error);
        res.status(500);
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

        // Checks if user already exists.
        const existingUser = await UserName.findOne({ username: req.body.username.toLowerCase() });
        if (!existingUser) {
            console.log('User not found:', username.toLowerCase());
            res.status(403);
            return next(new Error('No User with your username exists. Please signup.'));
        }

        // Check if password matches
        existingUser.checkPassword(password, (err, isMatch) => {
            if (err) {
                console.log(err)
                res.status(500).send('Error in route')
                return next(err)
            }
            if (!isMatch) {
                console.log('Password mismatch for user:', username.toLowerCase())
                res.status(403)
                return next(new Error('Password is incorrect.'))
            }

            // Generate JWT token
            const token = jwt.sign(existingUser.withoutPassword(), process.env.SECRET);
            console.log('User Authenticated, token generated:', token)

            return res.status(200).send({ token, user: existingUser.withoutPassword() })
        })
    }catch (error) {
        console.error('Error logging in user.', error)
        res.status(500)
        return next(error)
    }
})

// Get all users
authRouter.get('/users', async (req, res, next) => {
    try {
        const allUserNames = await UserName.find().select('-password')
        return res.status(200).send(allUserNames)
    } catch (error) {
        console.error('Error fetching all users.', error)
        res.status(500)
        return next(error)
    }
});

module.exports = authRouter;
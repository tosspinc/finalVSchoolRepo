const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const { expressjwt } = require('express-jwt');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 9000;

if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file.');
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


// Route to get user data
app.get('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

// MongoDB connection
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)            
        console.log('Connected to MongoDB.')
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
        process.exit(1);
    }
};

connectToDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

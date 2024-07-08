const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const {expressjwt} = require('express-jwt')

dotenv.config();

const app = express();
const port = 9000;


if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file.");
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// MongoDB connection
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to the MongoDB: ", error);
        process.exit(1);
    }
};

connectToDb();

// Routes
app.use('/api/auth', require('./models/authRouter.js'));
app.use('/api/user', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/user/issues', require('./models/currentIssuesRouter.js'));


// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({ errMsg: err.message });
});

// Server listen
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

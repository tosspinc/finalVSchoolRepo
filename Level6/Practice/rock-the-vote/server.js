const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config()
const { expressjwt } = require('express-jwt')
const cors = require('cors')


const app = express();
const port = 9000;


if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file.");
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

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
// test comment
// Routes
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/user/issues', require('./routes/currentIssuesRouter.js'));


// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({ errMsg: err.message });
});

// Server listen
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
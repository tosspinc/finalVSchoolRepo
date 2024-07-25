const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const { expressjwt } = require('express-jwt');
require('dotenv').config();
const cors = require('cors')

const app = express();
const port = 9000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

//checks to see if there is an .env file.
if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file.');
    process.exit(1);
}

// MongoDB connection
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
        process.exit(1);
    }
};

connectToDb();

// Routes


// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send({ errMsg: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

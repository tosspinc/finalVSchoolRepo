const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const { expressjwt } = require('express-jwt');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 9000;

if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in .env file.')
    process.exit(1)
}

//middleware
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

//mongo connection
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB.')
    } catch (error) {
        console.error("Error conntecting to MongoDB: ", error) 
        process.exit(1)
    }
}
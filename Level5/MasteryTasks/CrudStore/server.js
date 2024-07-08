const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')

//import inventoryRouter from './routes/inventoryRouter'

dotenv.config()

const app = express()
const port = 9000;

// Check if MONGO_URI is loaded correctly
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file.")
    process.exit(1)
}

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.use("/inventory", require("./routes/inventoryRouter.js"))

// MongoDB connection
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the MongoDB");
    } catch (error) {
        console.error("Error connecting to the MongoDB: ", error);
        console.error("Error stack: ", error.stack)
        process.exit(1)
    }
};

// Calling connection to database function
connectToDb();


// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({ errMsg: err.message });
});

// Server listen
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
import { connect } from 'mongoose';
import express, { json } from 'express'; 
import morgan from 'morgan';   
import dotenv from 'dotenv';
import bountyHunterRouter from './routes/bountyHunterRouter.js';

dotenv.config()

const app = express();   
const port = 9000

//checks if MONGO_URI is loaded correctly.
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file")
    process.exit(1)
}


// Middleware
app.use(json());
app.use(morgan("dev"));

//connect to mongodb
const connectToDb = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log("Connected to mongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error)
        console.error("Error Stack:", error.stack)
        process.exit(1)
    }
}

//calls connection to mongodb function
connectToDb()

// Route handling
app.use("/api/bounty", bountyHunterRouter)

// Basic error handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({ errMsg: err.message });});

// Server listen
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

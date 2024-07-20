const mongoose = require("mongoose")
const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const inventoryRouter = require("./routes/inventoryRouter.js");
const cartRouter = require("./routes/cartItemRouter.js");
const { expressjwt } = require("express-jwt");

dotenv.config();


const app = express();
const port = 9000;

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser())
app.use(cors())

// Check if MONGO_URI is loaded correctly
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file.")
    process.exit(1)
}

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

//routes
//page routes
//login & create account route.
app.use("/auth", require("./routes/authRouter.js"))
app.use('/api/inventory', inventoryRouter)
app.use('/api/user', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}) )
app.use('/api/user/cart', cartRouter)

//cookie settings code
app.get('/set-cookie', (req, res) => {
    res.cookie('user',  '12345', {maxAge: 900000, httpOnly: true})
    res.send("Cookie has been set!")
})

//route to get a cookie
app.get('/get-cookie', (req, res) => {
    let userId = req.cookies['user']
    if (userId) {
        res.send(`Cookie value: ${userId}`)
    } else {
        res.send('No cookie found.')
    }
})

// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({ errMsg: err.message });
});

// Server listen
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
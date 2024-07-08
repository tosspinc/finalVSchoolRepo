const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()
const port = 9000

app.use(cors())

//checks if MONGO_URI is loaded correctly
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env file')
  process.exit(1)
}

//middleware
app.use(express.json())
app.use(morgan('dev'))

//mongoDB connection
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

//calls connection to db
connectToDb()

//routes
app.use('/todo', require('./routes/todoRouter.js'))

//error handling
app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
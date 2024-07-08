const mongoose = require('mongoose')
const Schema = mongoose.Schema

//author schema or blueprint
const authorSchema = new Schema({
    name: {
        type: String,
        required: [true, "An authors name is required"],
        trim: true
    }
})

module.exports = mongoose.model("Author", authorSchema)
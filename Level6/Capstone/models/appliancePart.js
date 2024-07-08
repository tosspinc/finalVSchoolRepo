const mongoose = require('mongoose')
const Schema = mongoose.Schema

//appliance parts schema or blueprint
const applianceSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true
    },
    partNumber: {
        type: String,
        required: [true, 'Part number is required'],
        trim: true
    },
    manufacturer: {
        type: String,
        required: [true, 'Manufacturers name is required'],
        trim: true
    },
    likes: {
        type: Number,
        default: 0,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A brief description of the appliance item is required.'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [false, "an image of the appliance item is required"],
        trim: false
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true
    }
})

module.exports = mongoose.model("Appliance", applianceSchema)
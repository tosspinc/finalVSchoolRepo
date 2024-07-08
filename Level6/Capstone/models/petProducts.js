const mongoose = require('mongoose')
const Schema = mongoose.Schema

//pet product schema or model
const petProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A product name is required'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'product price is required'],
        trim: true
    },
    likes: {
        type: Number,
        default: 0,
        trim: true
    }
})

module.exports = mongoose.model('petProducts', petProductSchema)
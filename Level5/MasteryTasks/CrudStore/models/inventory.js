const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Inventory model or schema
const inventorySchema = new Schema({
    brand: {
        type: String,
        required: [true, "Brand is required"],
        trim: true // Removes any leading or trailing whitespace from the string value.
    },
    productName: {
        type: String,
        required: [true, "Product Name is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    }
})

module.exports = mongoose.model('Inventory', inventorySchema)


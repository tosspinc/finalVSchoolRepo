const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A brief description of the item is required.'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true
    },
    imageUrl: {
        type: String,
        required: false,
        trim: true
    },
    likes: {
        type: Number,
        default: 0,
        trim: true
    },
    category: {
        type: String,
        enum: ['Appliance Part', 'Book', 'Pet Product', 'Womens Cothing', 'Mens Clothing'],
        required: [true, 'Category is required'],
        trim: true
    },
    partNumber: {
        type: String,
        trim: true
    },
    manufacturer: {
        type: String,
        trim: true
    },
    yearPublished: {
        type: Number,
        trim: true
    },
    publisher: {
        type: String,
        trim: true
    },
    pages: {
        type: Number,
        trim: true
    },
    cover: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model("Inventory", inventorySchema);

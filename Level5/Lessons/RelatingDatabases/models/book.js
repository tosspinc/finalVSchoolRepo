const mongoose = require('mongoose')
const Schema = mongoose.Schema

//author schema or blueprint
const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true
    },
    yearPublished: {
        type: Number,
        required: [true, 'Year book published is required'],
        trim: true
    },
    publisher: {
        type: String,
        required: [true, 'Publishers name is required'],
        trim: true
    },
    pages: {
        type: Number,
        required: [true, 'Number of pages in book required'],
        trim: true
    },
    cover: {
        type: String,
        required: [true, 'Type of cover is required'],
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: [true, 'Reference is required'],
        trim: true
    },
    likes: {
        type: Number,
        default: 0,
        trim: true
    }
})

module.exports = mongoose.model("Book", bookSchema)
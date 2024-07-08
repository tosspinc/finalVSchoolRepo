const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: false,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
    trim: true
  },
  imgUrl: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model("Todo", todoSchema)
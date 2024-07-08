
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        trim: true
    },
    //references the related issue
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)
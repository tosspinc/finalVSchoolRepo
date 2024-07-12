const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imgUrl: {
        type: String,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "UserName",
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true  
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        trim: true
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        trim: true
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        trim: true
    }]
})

module.exports = mongoose.model("Issue", issueSchema)
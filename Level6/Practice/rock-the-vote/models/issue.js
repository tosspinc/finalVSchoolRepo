const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = require('./comment').Schema;

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
    votes: [{
        voter: {
            type: Schema.Types.ObjectId,
            ref: 'UserName',
            required: true,
            trim: true
        },
        voteType: {
            type: String,
            enum: ['upvote', 'downvote'],
            required: true,
            trim: true
        }
    }],
    upvotesCount: {
        type: Number,
        default: 0,
        trim: true
    },
    downvotesCount: {
        type: Number,
        default: 0,
        trim: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        trim: true
    }],
    commentsCount: {
        type: Number,
        default: 0,
        trim: true
    }
})

module.exports = mongoose.model("Issue", issueSchema)
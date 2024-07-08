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
    author: {
        type: Schema.Types.ObjectId,
        ref: "UserName",
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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: [commentSchema],
        trim: true
    }]
})

module.exports = mongoose.model("Issue", issueSchema)
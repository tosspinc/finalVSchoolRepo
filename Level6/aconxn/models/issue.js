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
    username: {
        type: String,
        required: false,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    }, 
    userVotes: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User'},
        vote: { type: String, enum: ['upvote', 'downvote']}
    }],
    comments: [{
        comment: { type: String, required: true },
        username: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User' }
    }]
});

module.exports = mongoose.model('Issue', issueSchema);

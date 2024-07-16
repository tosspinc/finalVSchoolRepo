const express = require('express');
const commentsRouter = express.Router();
const Comment = require('../models/comment');
const Issue = require('../models/issue');
const { expressjwt: jwt } = require('express-jwt');



// Get comments by issueId
commentsRouter.get('/', async (req, res, next) => {
    try {
        const comments = await Comment.find();
        return res.status(200).send(comments);
    } catch (error) {
        console.log('Error fetching comments', error);
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Create a new comment
commentsRouter.post('/:issueId', async (req, res, next) => {
    try {
        req.body.author = req.auth._id 
        req.body.issue = req.params.issueId
        req.body.username = req.auth.username
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()

        return res.status(201).send(savedComment);
    } catch (error) {
        console.log('Error adding a comment:', error);
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Update a specific comment
commentsRouter.put('/:commentId', async (req, res, next) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            req.body,
            {new: true}
        )
        res.status(200).send(updatedComment);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Delete a comment
commentsRouter.delete('/:commentId', async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).send({ message: `Comment successfully deleted.` });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

module.exports = commentsRouter;

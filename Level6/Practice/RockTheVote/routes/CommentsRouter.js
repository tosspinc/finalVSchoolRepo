const express = require('express');
const commentsRouter = express.Router();
const Comment = require('../models/comment.js');
const Issue = require('../models/issue');

commentsRouter.get('/', async (req, res, next) => {
    try {
        const allComments = await Comment.find();
        return res.status(200).send(allComments);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Get a specific comment by Id.
commentsRouter.get('/:issueId/:commentId', async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found.' });
        }
        res.status(200).send(comment);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Update a specific comment
commentsRouter.put('/:issueId/:commentId', async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
        if (!updatedComment) {
            return res.status(404).send({ message: 'Comment not found, unable to update.' });
        }
        res.status(200).send(updatedComment);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

commentsRouter.post('/', async (req, res, next) => {
    try {
        const { content, issueId } = req.body;

        // Check to verify if issue exists.
        const existingIssue = await Issue.findById(issueId);
        
        if (!existingIssue) {
            return res.status(404).send({ message: 'Current Issue does not exist.' });
        }

        // Create a new comment
        const newComment = new Comment({ content, issue: issueId });
        newComment.author = existingIssue.author
        const savedComment = await newComment.save();

        // Update issue with new comment.
        existingIssue.comments.push(savedComment._id);
        await existingIssue.save();

        return res.status(201).send(savedComment);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Delete a comment
commentsRouter.delete('/:issueId/:commentId', async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);

        if (!deletedComment) {
            return res.status(404).send({ error: 'No comment found.' });
        }

        return res.status(200).send({ message: `Comment with ID ${deletedComment._id} has been successfully deleted.` });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

module.exports = commentsRouter;

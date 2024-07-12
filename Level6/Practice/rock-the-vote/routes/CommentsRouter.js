const express = require('express');
const commentsRouter = express.Router();
const Comment = require('../models/comment.js');
const Issue = require('../models/issue');

// Middleware to check authentication
commentsRouter.use((req, res, next) => {
    if (req.method !== 'POST' && !req.auth) {
        return res.status(404).send('Unauthorized.')
    }
    next()
});

// Get comments by issueId
commentsRouter.get('/:issueId', async (req, res, next) => {
    try {
        const { issueId } = req.params;
        const comments = await Comment.find({ issue: issueId });
        return res.status(200).send(comments);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Create a new comment without authentication
commentsRouter.post('/', async (req, res, next) => {
    try {
        const { content, issueId, username = 'Anonymous' } = req.body;

        // Verify issue exists
        const existingIssue = await Issue.findById(issueId);
        if (!existingIssue) {
            return res.status(404).send({ message: 'Issue does not exist.' });
        }

        // Create new comment
        const newComment = new Comment({ content, issue: issueId, username });
        const savedComment = await newComment.save();

        // Update issue with new comment
        existingIssue.comments.push(savedComment._id);
        await existingIssue.save();

        return res.status(201).send(savedComment);
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
        const userId = req.auth._id

        // Find comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found.' });
        }

        // Check if authenticated user is author
        if (comment.author.toString() !== userId) {
            return res.status(403).send({ comment: 'Forbidden: You are not allowed to edit the comment.' });
        }

        // Update comment
        comment.content = content;
        const updatedComment = await comment.save();

        res.status(200).send(updatedComment);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Delete a comment
commentsRouter.delete('/:issueId/:commentId', async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const userId = req.auth._id

        // Find comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found.' });
        }

        // Check if authenticated user is the author
        if (comment.author.toString() !== userId) {
            return res.status(403).send({ message: 'Forbidden: You are not allowed to delete this comment.' });
        }

        // Delete comment
        await comment.remove();

        res.status(200).send({ message: `Comment successfully deleted.` });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

module.exports = commentsRouter;

const express = require('express');
const commentsRouter = express.Router();
const Comment = require('../models/comment');
const Issue = require('../models/issue');
const { expressjwt: jwt } = require('express-jwt');

// Middleware to check authentication
commentsRouter.use(jwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));

// Get comments by issueId
commentsRouter.get('/:issueId', async (req, res, next) => {
    try {
        const { issueId } = req.params;
        const comments = await Comment.find({ issue: issueId });
        return res.status(200).send(comments);
    } catch (error) {
        console.log('Error fetching comments', error);
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Create a new comment
commentsRouter.post('/:issueId', async (req, res, next) => {
    const { content } = req.body;
    const { issueId } = req.params;
    const author = req.auth._id;
    const username = req.auth.username;

    try {
        const existingIssue = await Issue.findById(issueId);
        if (!existingIssue) {
            return res.status(404).send({ message: "Issue does not exist." });
        }

        const newComment = new Comment({ content, issue: issueId, author, username });
        const savedComment = await newComment.save();

        if (!existingIssue.comments) {
            existingIssue.comments = [];
        }
        existingIssue.comments.push(savedComment._id);
        await existingIssue.save();

        return res.status(201).send(savedComment);
    } catch (error) {
        console.log('Error adding a comment:', error);
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Update a specific comment
commentsRouter.put('/:issueId/:commentId', async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.auth._id;

        // Find comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found.' });
        }

        // Check if authenticated user is author
        if (comment.author.toString() !== userId) {
            return res.status(403).send({ message: 'Forbidden: You are not allowed to edit the comment.' });
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
        const userId = req.auth._id;

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

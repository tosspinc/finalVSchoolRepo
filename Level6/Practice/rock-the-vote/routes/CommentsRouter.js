const express = require('express');
const commentsRouter = express.Router();
const Comment = require('../models/comment.js');
const Issue = require('../models/issue');

//middleware to check authentication
commentsRouter.use((req, res, next) => {
    if (!req.auth) {
        return res.status(401).send('Unauthorized.')
    }
    next()
})

//gets all comments or comments by issueId
commentsRouter.get('/', async (req, res, next) => {
    try {
        const { issueId } = req.query
        const query = issueId ? { issue: issueId} : {}
        const comments = await Comment.find(query)
        return res.status(200).send(comments)
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

//create a new comment
commentsRouter.post('/', async (req, res, next) => {
    try {
        const { content, issueId } = req.body
        const userId = req.auth._id

        //checks to verify is user exists.
        const existingIssue = await Issue.findById(issueId)

        if (!existingIssue) {
            return res.status(404).send({ message: 'Current issue does not exist.' })
        }

        //create new comment
        const newComment = new Comment({ content, issue: issueId, author: userId })
        const savedComment = await newComment.save()

        //update issue with new comment
        existingIssue.comments.push(savedComment._id)
        await existingIssue.save()

        return res.status(201).send(savedComment)
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error '})
        return next(error)
    }
})

// Update a specific comment
commentsRouter.put('/:issueId/:commentId', async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.auth._id

        //find comment
        const comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found.' })
        }

        //check if authenticaed user is author.
        if (comment.author.toString() !== userId) {
            return res.status(403).send({ comment: 'Forbidden: You are not allowed to edit the comment.' })
        }

        //update comment
        comment.content = content
        const updatedComment = await comment.save()

        res.status(200).send(updatedComment);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Delete a comment
commentsRouter.delete('/:issueId/:commentId', async (req, res, next) => {
    try {
        const { commentId } = req.params
        const userId = req.auth._id

        //find comment
        const comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found.' })
        }

        //checks if authenticated user is the author.
        if (comment.author.toString() !== userId) {
            return res.status(403).send({ message: 'Forbidden: You are not allowed to delete this comment.'})
        }

        //deletes comment
        await comment.remove()

        res.status(200).send({ message: `comment successfully deleted.` });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

module.exports = commentsRouter;

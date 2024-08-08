const express = require('express');
const Issue = require('../models/issue');
const User = require('../models/user');
const issueRouter = express.Router(); // Make sure this is defined at the top

// Post a new issue
issueRouter.post('/', async (req, res, next) => {
    try {
        req.body.userId = req.auth._id;
        const newIssue = new Issue(req.body);
        const savedIssue = await newIssue.save();
        return res.status(201).send(savedIssue);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

// Get issues by user id
issueRouter.get('/userPosts/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const userIssues = await Issue.find({ userId: userId }).populate('userId', 'username');
        return res.status(200).send(userIssues);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

// Get all issues
issueRouter.get('/allPosts', async (req, res, next) => {
    try {
        const allIssues = await Issue.find().populate('userId', 'username'); 
        return res.status(200).send(allIssues);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

// Edit an issue
issueRouter.put('/post/:issueId', async (req, res, next) => {
    try {
    const updatedIssue = await Issue.findByIdAndUpdate (
        req.params.issueId,
        req.body,
        { new: true}
    );
    if (!updatedIssue) {
        res.status(404)
        return next(new Error('Issue not found.'))
    }
    return res.status(200).send(updatedIssue)        
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

// Delete an issue
issueRouter.delete('/:issueId', async (req, res, next) => {
    try {
        const deletedIssue = await Issue.findByIdAndDelete(req.params.issueId)

        if (!deletedIssue) {
            return res.status(400).send({ message: 'No Issue has been found to delete.' })
        }

        return res.status(200).send({ message: `Issue titled ${deletedIssue.title} has been deleted successfully.` })
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

// Upvotes
issueRouter.post('/upvote/:issueId', async (req, res, next) => {
    try {
        const issue = await Issue.findById(req.params.issueId);
        const userId = req.auth._id;
        const userVote = issue.userVotes.find(vote => vote.userId.toString() === userId.toString());

        if (userVote) {
            if (userVote.vote === 'upvote') {
                return res.status(400).send({ message: 'You have already upvoted this issue.' });
            } else {
                issue.downvotes -= 1;
                issue.upvotes += 1;
                userVote.vote = 'upvote';
            }
        } else {
            issue.upvotes += 1;
            issue.userVotes.push({ userId, vote: 'upvote' });
        }

        await issue.save();
        return res.status(200).send(issue);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

// Downvotes
issueRouter.post('/downvote/:issueId', async (req, res, next) => {
    try {
        const issue = await Issue.findById(req.params.issueId);
        const userId = req.auth._id;
        const userVote = issue.userVotes.find(vote => vote.userId.toString() === userId.toString());

        if (userVote) {
            if (userVote.vote === 'downvote') {
                return res.status(400).send({ message: 'You have already downvoted this issue.' });
            } else {
                issue.upvotes -= 1;
                issue.downvotes += 1;
                userVote.vote = 'downvote';
            }
        } else {
            issue.downvotes += 1;
            issue.userVotes.push({ userId, vote: 'downvote' });
        }

        await issue.save();
        return res.status(200).send(issue);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

// Add a comment to an issue
issueRouter.post('/:issueId/comment', async (req, res, next) => {
    try {
        const issue = await Issue.findById(req.params.issueId);
        const userId = req.auth._id;

        issue.comments.push({ userId, comment: req.body.comment });

        await issue.save();
        return res.status(200).send(issue);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

module.exports = issueRouter;

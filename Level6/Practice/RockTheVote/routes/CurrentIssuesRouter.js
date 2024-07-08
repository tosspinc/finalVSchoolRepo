const express = require('express');
const currentIssuesRouter = express.Router();
const Issues = require('../models/issue.js');
const UserName = require('../models/user.js');

// Get all issues
currentIssuesRouter.get('/', async (req, res, next) => {
    try {
        const allIssues = await Issues.find()
        return res.status(200).send(allIssues);
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
        return next(error);
    }
});

// Get one issue by ID
currentIssuesRouter.get('/:issueId', async (req, res, next) => {
    try {
        const issue = await Issues.findById(req.params.issueId)
        return res.status(200).send(issue);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Get issues by specific user
currentIssuesRouter.get('/user', async (req, res, next) => {
    try {
        const userIssues = await Issues.find({ author: req.auth._id })
        return res.status(200).send(userIssues);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Post a new issue
currentIssuesRouter.post('/', async (req, res, next) => {
    try {
        req.body.author = req.auth._id

        // Create and save new issue
        const newIssue = new Issues(req.body);
        const savedIssue = await newIssue.save();

        return res.status(201).send(savedIssue);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

// Update an issue
currentIssuesRouter.put('/:issueId', async (req, res, next) => {
    try {

        // Update issue
        const updatedIssue = await Issues.findByIdAndUpdate(
            req.params.issueId,
            req.body,
            { new: true }
        )

        return res.status(200).send(updatedIssue);
    } catch (error) {
        res.status(500)
        return next(error);
    }
});

// Delete an issue
currentIssuesRouter.delete('/:issueId', async (req, res, next) => {
    try {
        const deletedIssue = await Issues.findByIdAndDelete(req.params.issueId);

        if (!deletedIssue) {
            return res.status(404).send({ message: 'No current issues found.' });
        }

        return res.status(200).send({ message: `Issue titled ${deletedIssue.title} has been deleted successfully.` });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        return next(error);
    }
});

module.exports = currentIssuesRouter;

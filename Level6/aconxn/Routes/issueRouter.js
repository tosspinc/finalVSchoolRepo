const express = require('express');
const Issue = require('../models/issue'); // Correct model import
const issueRouter = express.Router();

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
issueRouter.get('/', async (req, res, next) => {
    try {
        const foundIssues = await Issue.find({ userId: req.auth._id });
        return res.status(200).send(foundIssues);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

//edit an issue
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

// Get all issues
issueRouter.get('/all', async (req, res, next) => {
    try {
        const allIssues = await Issue.find(); 
        return res.status(200).send(allIssues);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

//delete an issue.
issueRouter.delete('/:issueId', async (req, res, next) => {
    try {
        const deletedIssue = await Issue.findByIdAndDelete(req.params.issueId)

        if (!deletedIssue) {
            return res.status(400).send({ message: 'No Issue has been found to delete.' })
        }

        return es.status(200).send({ message: `Issue titled ${deletedIssue.title} has been deleted successfully.` })
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = issueRouter;
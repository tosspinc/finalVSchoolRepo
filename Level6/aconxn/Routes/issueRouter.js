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

// Get all issues
issueRouter.get('/all', async (req, res, next) => {
    try {
        const allIssues = await Issue.find(); // Corrected: 'Issue'
        return res.status(200).send(allIssues);
    } catch (error) {
        res.status(500);
        return next(error);
    }
});

module.exports = issueRouter;

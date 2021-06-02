const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Community = require('../models/communities.js');

// ROUTES
// INDEX ROUTE
router.get('/', (req, res) => {
    res.render('index.ejs');
});

// CREATE COMMUNITY ROUTE
router.post('/', (req, res) => {
    Community.create(req.body, (error, createdCommunity) => {
        res.redirect('/');
    });
});

// GET NEW COMMUNITY ROUTE
router.get('/new', (req, res) => {
    res.render('new.ejs');
});


module.exports = router;
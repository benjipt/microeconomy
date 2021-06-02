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

// GET SHOW COMMUNITIES
router.get('/community', (req, res) => {
    Community.find({}, (error, allCommunities) => {
        if (error) {
            res.send(error);
        } else {
            res.render('show_community.ejs', {
                communities: allCommunities
            });
        }
    })
});


module.exports = router;
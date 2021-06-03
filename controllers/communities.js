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

// GET MEMBERS
router.get('/community/:id', (req, res) => {
    Community.findById(req.params.id, (error, foundCommunity) => {
        res.render('show_members.ejs', {
            community: foundCommunity
        });
    });
});

router.put('/community/:id', (req, res) => {
    Community.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
        res.redirect('/community');
    });
});

router.get('/community/:id/edit', (req, res) => {
    Community.findById(req.params.id, (error, foundCommunity) => {
        res.render('edit_community.ejs', {
            community: foundCommunity
        });
    });
});


module.exports = router;
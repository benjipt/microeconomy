const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Community = require('../models/communities.js');
const Member = require('../models/members.js');

// ROUTES
// INDEX ROUTE
router.get('/', (req, res) => {
    res.render('index.ejs');
});

// CREATE COMMUNITY ROUTE
router.post('/', (req, res) => {
    Community.create(req.body, (error, createdCommunity) => {
        res.redirect('/community');
    });
});

// GET NEW COMMUNITY ROUTE
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// GET SHOW COMMUNITIES
router.get('/community', (req, res) => {
    Community.find({}, (err, allCommunities) => {
        if (error) {
            res.send(err);
        } else {
            res.render('show_community.ejs', {
                communities: allCommunities
            });
        }
    })
});

// GET MEMBERS
router.get('/community/:id', (req, res) => {
    Community.findById(req.params.id, (err, foundCommunity) => {
        res.render('show_members.ejs', {
            community: foundCommunity
        });
    });
});

router.post('/community/:id', (req, res) => {
    Member.create(req.body, (err, createdMember) => {
        Community.findByIdAndUpdate(req.params.id, {
            $push: { members: createdMember.id }
        }, { new: true }, (err, foundCommunity) => {
            res.redirect('/community/' + req.params.id);
        });
    });
});

router.delete('/community/:id', (req, res) => {
    Community.findByIdAndRemove(req.params.id, (error, deletedCommunity) => {
        res.redirect('/community');
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

router.get('/community/:id/new', (req, res) => {
    Community.findById(req.params.id, (error, foundCommunity) => {
        res.render('new_member.ejs', {
            community: foundCommunity
        });
    });
});

module.exports = router;
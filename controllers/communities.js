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
        if (err) {
            res.send(err);
        } else {
            res.render('show_community.ejs', {
                communities: allCommunities
            });
        }
    })
});

// GET MEMBERS
// 1: https://dba.stackexchange.com/questions/197618/how-do-we-reference-to-a-collection-in-mongodb
// 2: https://www.bmc.com/blogs/mongodb-operators/
router.get('/community/:id', (req, res) => {
    Community.findById(req.params.id, (err, foundCommunity) => {
        // console.log(foundCommunity.members);
        Member.find({
            "_id" : { $in : foundCommunity.members }
        }, (err, matchingMembers) => {
            // console.log(matchingMembers);
            res.render('show_members.ejs', {
                community: foundCommunity,
                members: matchingMembers
            });
        });
    });
});

// CREATE MEMBERS
router.post('/community/:id', (req, res) => {
    Member.create(req.body, (err, createdMember) => {
        Community.findByIdAndUpdate(req.params.id, {
            $push: { members: createdMember.id }
        }, { new: true }, (err, foundCommunity) => {
            res.redirect('/community/' + req.params.id);
        });
    });
});

// DELETE COMMUNITY
router.delete('/community/:id', (req, res) => {
    Community.findByIdAndRemove(req.params.id, (err, deletedCommunity) => {
        res.redirect('/community');
    });
});

// UPDATE COMMUNITY
router.put('/community/:id', (req, res) => {
    Community.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
        res.redirect('/community');
    });
});

// GET EDIT COMMUNITY
router.get('/community/:id/edit', (req, res) => {
    Community.findById(req.params.id, (err, foundCommunity) => {
        res.render('edit_community.ejs', {
            community: foundCommunity
        });
    });
});

// GET NEW MEMBER
router.get('/community/:id/new', (req, res) => {
    Community.findById(req.params.id, (err, foundCommunity) => {
        res.render('new_member.ejs', {
            community: foundCommunity
        });
    });
});

// GET MEMBER EDIT PAGE
router.get('/member/:id', (req, res) => {
    Member.findById(req.params.id, (err, foundMember) => {
        res.render('edit_member.ejs', {
            member: foundMember
        });
    });
});

// UPDATE MEMBER
router.put('/member/:id', (req, res) => {
    Member.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
        res.redirect('/community');
    });
});

module.exports = router;
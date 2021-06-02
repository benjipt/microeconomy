const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Community = require('../models/communities.js');

// ROUTES
// INDEX ROUTE
router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/new', (req, res) => {
    res.render('new.ejs');
});


module.exports = router;
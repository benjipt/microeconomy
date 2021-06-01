const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Community = require('../models/communities.js');

// ROUTES
// index
router.get('/', (req, res) => {
    res.send('This is the index page');
});
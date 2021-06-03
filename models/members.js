const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    about: String,
    website: String,
    email: { type: String, required: true },
    communities: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Communities' } ]
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
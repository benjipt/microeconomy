const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    members: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Members' } ]
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
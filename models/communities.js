const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    admin: [ { type: String, required: true } ],
    member: [ String ]
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;

// For Member Schema:
// {
//     name: { type: String, required: true }, 
//     about: String,
//     urls: [ String ],
//     email: { type: String, required: true }
// }
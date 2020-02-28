const mongoose = require ('mongoose');
const User = require('./User')

const ProfileSchema = new mongoose.Schema({
    displayName: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 50,
    },
    User: {
        requiredPaths: true,
        type: User.schema,
    },
    instruments: {
        type: [String],
        min: 0,
        max: 3
    },
    genres: {
        type: [String],
        min: 0,
        max: 3,
    },
    bio: {
        type: String,
        minlength: 0,
        maxlength: 100
    },
    image: {
        type: String
    },
    location: {
        type: [String],
        min: 2,
        max: 2,
    }
});

module.exports = mongoose.model('Profile',ProfileSchema);
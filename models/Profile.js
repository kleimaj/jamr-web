const mongoose = require ('mongoose');

const ProfileSchema = new mongoose.Schema({
    artistName: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 50,
    },
    UserRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        type: [Number],
    }
});

module.exports = mongoose.model('Profile',ProfileSchema);
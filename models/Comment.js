const mongoose = require('mongoose');
const Profile = require('./Profile');

const CommentSchema = new mongoose.Schema({
    body: {
        type: String,
        minlength: 0,
        maxlength: 60,
    },
    from: {
        type: String
    },
    to: {
        type: String
    }

});

module.exports = mongoose.model('Comment',CommentSchema);
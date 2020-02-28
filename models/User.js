const mongoose = require('mongoose');
const Profile = require('./Profile');

const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        minlength: 3,
        maxLength: 50,
    },
    password: {
        required: true,
        type: String,
        minlength: 6,
        maxLength: 50,
    },
    Profile: {
        required: true,
        type: Profile.schema
    }
});

module.exports = mongoose.model('User',UserSchema);
const mongoose = require ('mongoose');

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
    }
});

module.exports = mongoose.model()
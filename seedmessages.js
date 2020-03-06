const db = require('./models');
const mongoose = require('mongoose');

db.Comment.deleteMany({}, (err, nukedUsers) => {
    if (err) return console.log('unable to nuke users:',err);
    console.log('successfully nuked users...');
    console.log();
    console.log('inserting users...');
    mongoose.connection.close();
});
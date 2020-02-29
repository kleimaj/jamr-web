const db = require('./models');
const mongoose = require('mongoose');

const users = require('./seed/populateUsers');

const seedDB = () => {
    console.log('nuking users...');
    db.User.deleteMany({}, (err, nukedUsers) => {
        if (err) return console.log('unable to nuke users:',err);
        console.log('successfully nuked users...');
        console.log();
        console.log('inserting users...');
        db.User.insertMany(users, (err, newUsers) => {
            if (err) return console.log('unable to insert users:',err);
            console.log('successfully inserted users...');
            mongoose.connection.close();
        })
    });
}
seedDB();
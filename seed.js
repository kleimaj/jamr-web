const db = require('./models');
const mongoose = require('mongoose');

const users = require('./seed/populateUsers');
const profiles = require('./seed/populateProfiles');


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

const seedProfiles = () => {
    console.log('nuking profiles...');
    db.Profile.deleteMany({}, (err, nukedUsers) => {
        if (err) return console.log('unable to nuke profiles:',err);
        console.log('successfully nuked profiles...');
        console.log();
        console.log('inserting profiles...');
        db.Profile.insertMany(profiles, (err, newUsers) => {
            if (err) return console.log('unable to insert profiles:',err);
            console.log('successfully inserted profiles...');
            mongoose.connection.close();
        })
    });
}
// seedDB();
seedProfiles();
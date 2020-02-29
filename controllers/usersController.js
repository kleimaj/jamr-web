const db = require('../models')
const mongoose = require('mongoose');

const index = (req, res) => {
    console.log(req.body);
    db.User.find({}, (err, allUsers) => {
        if (err) return res.status(400).json({status: 400, error: 'Users Not Found, please try again'});

        res.json(allUsers);
    });
}

const login = (req, res) => {
    console.log('Logging in user...');
    console.log(req.body);
    db.User.find({$and: [{username: req.body.username}, {password: req.body.password}]}, (err, foundUser) => {
        if (err) return res.status(400).json({status: 400, error: 'User Not Found, please try again'});
        console.log(foundUser);
        res.json(foundUser);
    });
}

const show = (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    let body = JSON.parse(req.params.id);
    console.log(body);
    db.User.find(body, (err, foundUser) => {
        if (err) return res.status(400).json({status: 400, error: 'User Not Found, please try again'});
        console.log(foundUser);
        console.log(foundUser[0]._id);
        console.log('finding profile...');
        const userRef = mongoose.Types.ObjectId(foundUser[0]._id);
        console.log(userRef);
        db.Profile.find({UserRef: userRef}, (err, foundProfile) => {
            if (err) return res.status(400).json({status: 400, error: 'User Not Found, please try again'});
            console.log('profile found...');
            console.log(foundProfile);
            res.json(foundProfile);
        });
    });
}

const create = (req, res) => {
    console.log('creating user...');
    console.log(req.body);
    db.User.create(req.body, (err, newUser) => {
        if (err) return res.status(400).json({status: 400, error: 'Unable to create User, please try again'});
        console.log('user created...');
        res.json(newUser);
    });
}

module.exports = {
    index,
    show,
    create,
    login,
}
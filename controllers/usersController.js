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
    db.User.find({$and: [{username: req.body.username}, {password: req.body.password}]}, (err, foundUser) => {
        if (err) return res.status(400).json({status: 400, error: 'User Not Found, please try again'});
        res.json(foundUser);
    });
}

const show = (req, res) => {
    let body = JSON.parse(req.params.id);
    db.User.find(body, (err, foundUser) => {
        if (err) return res.status(400).json({status: 400, error: 'User Not Found, please try again'});
        if(foundUser.length==0) {
            return res.status(400).json({status: 400, error: 'User Not Found, please try again'});
        }
        const userRef = mongoose.Types.ObjectId(foundUser[0]._id);
        db.Profile.find({UserRef: userRef}, (err, foundProfile) => {
            if (err) return res.status(400).json({status: 400, error: 'User Not Found, please try again'});
            res.json(foundProfile);
        });
    });
}

const create = (req, res) => {
    db.User.create(req.body, (err, newUser) => {
        if (err) return res.status(400).json({status: 400, error: 'Unable to create User, please try again'});
        res.json(newUser);
    });
}

module.exports = {
    index,
    show,
    create,
    login,
}
const db = require('../models')

const index = (req, res) => {
    db.User.find({}, (err, allUsers) => {
        if (err) return res.status(400).json({status: 400, error: 'Users Not Found, please try again'});

        res.json(allUsers);
    });
}

const show = (req, res) => {
    db.User.findById({_id: req.params.id}, (err, foundUser) => {
        if (err) return res.status(400).json({status: 400, error: 'User Not Found, please try again'});
        console.log('user found')
        res.json(foundUser);
    });
}

const create = (req, res) => {
    console.log('creating user...');
    console.log(req);
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
}
const db = require('../models');

const index = (req, res) => {
    db.Profile.find({}, (err, allProfiles) => {
        if (err) return res.status(400).json({status: 400, error: 'Profiles Not Found, please try again'});
        res.json(allProfiles);
    });
}

const show = (req, res) => {

    db.Profile.find({_id: req.params.id}, (err, foundProfile) => {
        if (err) return res.status(400).json({status: 400, error: 'Profile Not Found, please try again'});
        if (foundProfile.length === 0) {
            res.status(400).json({status: 400, error: "Profile not found in Database"});
        }
        else {
            res.json(foundProfile);
        }
    });
}

const update = (req, res) => {
    db.Profile.findOneAndUpdate({_id: req.params.id}, req.body, (err, updatedProfile) => {
        if (err) return res.status(400).json({status: 400, error: 'Unable to update Profile, please try again'});
        res.json(updatedProfile);
    });
}

const create = (req, res) => {
    db.Profile.create(req.body, (err, newProfile) => {
        if (err) return res.status(400).json({status: 400, error: 'Unable to create Profile, please try again'});
        res.json(newProfile);
    });
}
const destroy = (req, res) => {
    db.User.findOneAndRemove({_id: req.params.id}, (err, deletedUser) => {
        db.Profile.findOneAndRemove({_id: req.params.id}, (err, deletedProfile) => {
            if (err) return res.status(400).json({status: 400, error: 'Unable to delete Profile, please try again'});
            // delete user
            res.json(deletedProfile);
        });    
    });
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}
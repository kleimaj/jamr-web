const db = require('../models')

const index = (req, res) => {
    db.Profile.find({}, (err, allProfiles) => {
        if (err) return res.status(400).json({status: 400, error: 'Profiles Not Found, please try again'});

        res.json(allProfiles);
    });
}

const show = (req, res) => {
    db.Profile.findById({_id: req.params.id}, (err, foundProfile) => {
        if (err) return res.status(400).json({status: 400, error: 'Profile Not Found, please try again'});
        console.log('Profile found')
        res.json(foundProfile);
    });
}

const create = (req, res) => {
    db.Profile.create(req.body, (err, newProfile) => {
        if (err) return res.status(400).json({status: 400, error: 'Unable to create Profile, please try again'});

        res.json(newProfile);
    });
}
// const destroy = (req, res) => {
//     db.Profile.findByIdAndDelete({_id: req.params.id}, (err, deletedProfile) => {
//         if (err) return res.status(400).json({status: 400, error: 'Unable to delete Profile, please try again'});
//         // delete user
//         db.User.findByIdAndDelete
//         // res.json(newProfile);
//     });
// }

module.exports = {
    index,
    show,
    create,
}
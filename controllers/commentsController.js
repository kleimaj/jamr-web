const db = require('../models')

const index = (req, res) => {
    db.Comment.find({to: req.params.id}, (err, allComments) => {
        if (err) return res.status(400).json({status: 400, error: 'Comments Not Found, please try again'});
        res.json(allComments);
    });
}

const create = (req, res) => {
    db.Comment.create(req.body, (err, newComment) => {
        if (err) return res.status(400).json({status: 400, error: 'Unable to create Comment, please try again'});
        res.json(newComment);
    });
}

module.exports = {
    index,
    create,
}
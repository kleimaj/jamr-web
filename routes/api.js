const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// -------- User Routes
router.get('/users', ctrl.users.index);
router.get('/users/:id', ctrl.users.show);
// router.get('/login', ctrl.users.login);
router.post('/users', ctrl.users.create);

// -------- Profile Routes
router.get('/profile', ctrl.profiles.index);
router.get('/profile/:id', ctrl.profiles.show);
router.post('/profile',ctrl.profiles.create)
router.put('/profile/:id', ctrl.profiles.update); // Edit Profile data.
router.delete('/profile/:id', ctrl.profiles.destroy); // Edit Profile data.
// router.get('')

// -------- Comment Routes
router.get('/profile/:id/comments', ctrl.comments.index); //get user's comments
router.post('/profile/:id/comments', ctrl.comments.create); //create comments on user's profile


module.exports = router;
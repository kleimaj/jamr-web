const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// -------- User Routes
router.get('/users', ctrl.users.index);
router.get('/users/:id', ctrl.users.show);
// router.get('/login', ctrl.users.login);
router.post('/users', ctrl.users.create);

// -------- Profile Routes
router.get('/profile/:id', ctrl.profiles.show);
router.get('/profile', ctrl.profiles.index);
router.post('/profile',ctrl.profiles.create)
// router.get('')


module.exports = router;
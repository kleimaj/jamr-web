const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// -------- User Routes
router.get('/users', ctrl.users.index);
router.get('/users/:id', ctrl.users.show);
router.post('/users', ctrl.users.create);

// -------- Profile Routes
router.get('/login', ctrl.profiles.show);
// router.get('')


module.exports = router;
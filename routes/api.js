const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// -------- User Routes
router.get('/users', ctrl.users.index);
router.get('/users/:id', ctrl.users.show);
router.post('/users', ctrl.users.create);
// router.put('/users/:id', ctrl.users.update);  
// router.delete('/users/:id', ctrl.users.destroy);
  

module.exports = router;
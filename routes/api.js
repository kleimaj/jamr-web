const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Multer
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file, callback){

    // Allowed file ext
    let fileTypes = /jpeg|jpg|png|gif/;

    // Check file ext
    let ext = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    // Check mime
    let mimeType = fileTypes.test(file.mimetype);

    if(mimeType && ext){
        return callback(null,true);
      } else {
        callback('Error: Images Only!');
      }
}

// Init upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function (req, file, callback){
        checkFileType(file, callback);
    }
}).single('img');


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
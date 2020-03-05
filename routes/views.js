const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
    res.sendFile('views/index.html', {
        root: __dirname + '/../'
    });
})

router.get('/login', (req, res) => {
    res.sendFile('views/login/login.html', {
        root: __dirname + '/../'
    });
})

router.get('/signup', (req, res) => {
    res.sendFile('views/signup/signup.html', {
        root: __dirname + '/../'
    });
})

router.get('/createProfile', (req,res) => {
    res.sendFile('views/signup/createProfile.html', {
        root: __dirname + '/../'
    });
});


router.get('/profiles/:id', (req,res) => {
    res.sendFile('views/profiles/profile.html', {
        root: __dirname + '/../'
    });
 });

router.get('/map', (req, res) => {
res.sendFile('views/map/map.html', {
        root: __dirname + '/../'
    });
});

router.get('/lounge', (req, res) => {
    res.sendFile('views/chat/chat.html', {
            root: __dirname + '/../'
        });
    });

router.get('/settings', (req,res) => {
    res.sendFile('views/profiles/settings.html', {
        root: __dirname + '/../'
    });
});

// Multer
router.get('/test', (req, res) => {
    res.render('index');
});

router.post('/upload', (req, res) => {
    
    upload(req, res, (err) => {

        if (err){
            res.render('index', {
                msg: err
            });
        }

        else {

            if (req.file === undefined){

                res.render('index', {
                    msg: 'Error: No file selected'
                });

            }

            else {
                res.render('index', {
                    msg: 'File uploaded',
                    file: `uploads/${req.file.filename}`
                });
            }
            
        }
    });
});


module.exports = router;

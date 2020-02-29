const express = require('express');
const router = express.Router();

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



module.exports = router;

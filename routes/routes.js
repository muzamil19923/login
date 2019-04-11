var express = require('express');
var router = express.Router();
var path = require("path");

var controller = require('../controllers/controller.js');
 
//Hello WORLD
router.get('/',(req,res)=>{
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//Sample HTML page  
router.get('/subjectadding', (req,res) => {
    res.sendFile(path.join(__dirname, '../public', 'subjectAdding.html'));
});

//Sample user details page
router.get('/userDetails', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'userDetails.html'));
})

//Sample course plan page
router.get('/coursePlan', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'coursePlan.html'));
})
// registeration of the user
router.post('/account/signup', controller.createUser);

//Signin
router.post('/account/signin', controller.signIn);

//Signout
router.get('/account/signout', controller.signOut);

module.exports = router;
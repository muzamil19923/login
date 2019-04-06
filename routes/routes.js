var express = require('express');
var router = express.Router();
var path = require("path");

var controller = require('../controllers/controller.js');
 
//Hello WORLD
router.get('/',(req,res)=>{
    res.send("hello world");
});

//Sample HTML page  
router.get('/subjectadding',function(req,res){
    res.sendFile(path.join(__dirname+'/subjectadding.html'));

});

// registeration of the user
router.post('/api/account/signup', controller.createUser);

module.exports = router;
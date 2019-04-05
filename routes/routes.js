var express = require('express');
var router = express.Router();
var path = require("path");


var controller = require('../controllers/controller.js');

router.get('/',(req,res)=>{
    res.send("hello world");
});

// registeration of the user
router.post('/api',controller.createUser);

router.get('/subjectadding',function(req,res){
    res.sendFile(path.join(__dirname+'/subjectadding.html'));

});

module.exports = router;
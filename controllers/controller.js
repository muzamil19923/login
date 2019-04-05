var mongoose = require('mongoose');
var User = mongoose.model('register');
var bcrypt = require("bcrypt");

var createUser = (req,res) => {
    var user = new User({
        "username": req.body.name,
        "password": bcrypt.hashSync("req.body.password",10),
        "re_password": bcrypt.hashSync("req.body.re_password",10)
    });
    user.save(function(err,newUser){
        if(!err){
            res.send(newUser);
           }else{
                res.sendStatus(400);
           }
    })
};

 module.exports.createUser = createUser;

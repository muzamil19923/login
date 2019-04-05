var mongoose = require('mongoose');
var registerUser = mongoose.Schema(
    {
        "username":String,
        "password":String,
        "re_password":String
    }
);
mongoose.model('register',registerUser);

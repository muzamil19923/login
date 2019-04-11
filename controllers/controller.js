var mongoose = require('mongoose');
var bcrypt = require("bcrypt");
const User = require('../models/User');
const UserSession = require('../models/UserSession');

var createUser = (req, res, next) => {
    const { body } = req;
    const {
        firstName,
        lastName,
        password
    } = body;
    let {
        email
    } = body;

    if (!firstName) {
        return res.send({
            success: false,
            message: 'Error: First name cannot be empty '
        });
    }
    if (!lastName) {
        return res.send({
            success: false,
            message: 'Error: Last name cannot be empty '
        });
    }
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be empty '
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be empty '
        });
    }
    email = email.toLowerCase();

    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server Error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist'
            });
        }
        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed Up'
            });
        });
    });
};

var signIn = (req, res, next) => {
    const { body } = req;
    const {
        password
    } = body;
    let {
        email
    } = body;

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be empty '
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be empty '
        });
    }

    email = email.toLowerCase();

    User.find({
        email: email
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server Error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Username Not Found'
            });
        }
        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Password doesnt not match'
            });
        }

        //If the username and password is corecrt then
        const userSession = new UserSession();
        userSession.userId = user._id;

        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: ' Logged In',
                token: doc._id
            });
        });
    });
};

var signOut = (req, res, next) => {
    const { query } = req;
    const { token } = query;
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
            $set: {
                isDeleted: true
            }
        }, null, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }
            return res.send({
                success: true,
                message: 'Logout Succesful'
            });
        });
};


module.exports.createUser = createUser;
module.exports.signIn = signIn;
module.exports.signOut = signOut;

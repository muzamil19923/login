var mongoose = require('mongoose');
var bcrypt = require("bcrypt");
const User = require('../models/User');

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

module.exports.createUser = createUser;


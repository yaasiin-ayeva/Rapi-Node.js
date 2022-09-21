// Imports
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var models = require('../models/');

// Routes
module.exports = {
    register: (req, res) => {
        
        // Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var bio = req.body.bio;

        if (email == null || username == null || password == null) {
            return res.status(404).json({'error':'missing parameters'});
        }

        // TODO verify pseudo length, mail regex, password etc.

        // Search the email in the database to avoid email conflict before store the user
        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then((userFound) => {
            if (!userFound) {   // Their is no user with this email adress in db
                bcrypt.hash(password, 5, (err, bcryptPassword) => {
                    var newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptPassword,
                        bio: bio,
                        isAdmin: 0
                    })
                    .then((newUser) => {
                        return res.status(201).json({'userId': newUser.id});
                    }).catch((err) => {
                        return res.status(500).json({'error': 'cannot add user'});
                    })
                });
            } else {
                return res.status(409).json({'error': 'user already exist'});
            }
        })
        .catch((err) => {
            return res.status(500).json({'error': 'unable to verify user'});
        });
    },

    login: (req, res) => {

    }
}
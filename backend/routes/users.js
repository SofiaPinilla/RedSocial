const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
// const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', (req, res) => res.send('login'));

// Register Page
router.get('/register', (req, res) => res.send('register'));

// Register
router.post('/register', (req, res) => {
        const { name, email, password, password2 } = req.body;
        let errors = [];

        if (!name || !email || !password || !password2) {

            errors.push({ msg: 'Please enter all fields' });
        }
        if (password != password2) {
            errors.push({ msg: 'Passwords do not match' });
        }
        if (errors.length > 0) {
            res.send({
                errors,
                name,
                email,
                password,
                password2
            })
        } else {
            newUser = new User({...req.body })
            bcrypt.genSalt(10, (errors, salt) => {
                bcrypt.hash(newUser.password, salt, (errors, hash) => {
                    if (errors) throw errors;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.send(user))
                        .catch(errors => console.log(errors));
                });
            })
        }

    })
    // ('/register', (req, res) => {
    //   const { name, email, password, password2 } = req.body;
    //   





// if (password.length < 6) {
//   errors.push({ msg: 'Password must be at least 6 characters' });
// }


// } else {
//   User.findOne({ email: email }).then(user => {
//     if (user) {
//       errors.push({ msg: 'Email already exists' });
//       res.send('register', {
//         errors,
//         name,
//         email,
//         password,
//         password2
//       });
//     } else {
//       const newUser = new User({
//         name,
//         email,
//         password
//       });

//      
// });

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;
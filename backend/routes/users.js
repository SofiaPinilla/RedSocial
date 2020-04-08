const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const { authentication } = require('../middleware/authentication');
// Load User model

// const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', (req, res) => res.send('login'));

// Register Page
router.get('/register', (req, res) => res.send('register'));

// Register
router.post('/register', UserController.register);



// Login
router.post('/login', UserController.login);

// Logout
// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/users/login');
// });

module.exports = router;
const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const { authentication } = require('../middleware/authentication');
const { uploadUserProfileImages, uploadUserHeaderImages } = require('../middleware/multer');
// const { uploadProfileImages } = require('../middleware/multer.js');
// Load User model

// const { forwardAuthenticated } = require('../config/auth');

router.get('/info', authentication, UserController.getInfo);

// Register
router.post('/register', UserController.register);
router.put('/', authentication, uploadUserProfileImages.single('avatar'), UserController.update);
router.put('/header', authentication, uploadUserHeaderImages.single('headerImage'), UserController.updateHeader);

router.get('/follow/:user_id', authentication, UserController.follow)

// Login
router.post('/login', UserController.login);

// Logout
// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/users/login');
// });

module.exports = router;
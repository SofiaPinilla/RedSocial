const router = require('express').Router();
const PublicationController = require('../controllers/PublicationController');
const { authentication, isAuthor } = require('../middleware/authentication');
var express = require('express');
var { uploadPublicationsImages } = require('../config/multer.js')

router.get('/', PublicationController.getAll);
router.post('/', authentication, uploadPublicationsImages.single('image'), PublicationController.insert);
router.put('/:_id', authentication, isAuthor, PublicationController.update);
router.delete('/:_id', authentication, isAuthor, PublicationController.delete);
module.exports = router;
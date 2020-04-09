const router = require('express').Router();
const PublicationController = require('../controllers/PublicationController');
const { authentication } = require('../middleware/authentication');
var express = require('express');
var { uploadPublicationsImages } = require('../config/multer.js')

router.get('/', PublicationController.getAll)
router.post('/', uploadPublicationsImages.single('image'), PublicationController.insert)
router.delete('/:id', PublicationController.delete)
module.exports = router;
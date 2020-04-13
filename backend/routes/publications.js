const router = require('express').Router();
const PublicationController = require('../controllers/PublicationController');
const { authentication, isAuthor } = require('../middleware/authentication');
const { uploadPublicationsImages } = require('../middleware/multer.js')

router.get('/', PublicationController.getAll);
router.post('/', authentication, uploadPublicationsImages.single('image'), PublicationController.insert);
router.put('/:_id', authentication, isAuthor, uploadPublicationsImages.single('image'), PublicationController.update);
router.delete('/:_id', authentication, isAuthor, PublicationController.delete);
module.exports = router;
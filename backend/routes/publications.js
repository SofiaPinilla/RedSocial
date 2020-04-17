const router = require('express').Router();
const PublicationController = require('../controllers/PublicationController');
const { authentication, isAuthor } = require('../middleware/authentication');
const { uploadPublicationsImages } = require('../middleware/multer.js')

router.get('/', PublicationController.getAll);
router.get('/:_id', PublicationController.getPubliId);
router.get('/search/:search', PublicationController.search);
router.post('/', authentication, uploadPublicationsImages.single('image'), PublicationController.insert);
router.put('/:_id', authentication, isAuthor, uploadPublicationsImages.single('image'), PublicationController.update);
router.put('/likes/:_id', authentication, PublicationController.like);
router.put('/dislikes/:_id', authentication, PublicationController.disLike);

router.delete('/:_id', authentication, isAuthor, PublicationController.delete);

module.exports = router;
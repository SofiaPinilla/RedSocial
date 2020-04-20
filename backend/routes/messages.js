const router = require('express').Router();
const MessageController = require('../controllers/MessageController');
const { authentication, isAuthor, isCommentAuthor } = require('../middleware/authentication');
const { uploadCommentImages } = require('../middleware/multer.js')


router.get('/', MessageController.getAll)
router.get('/get', authentication, MessageController.getMessage) //los que envía la usuaria conectada
router.get('/get/:recipient_name', authentication, MessageController.getSenderMessage) //los que recibe la ususaria conectada
router.post('/:recipient_name', authentication, MessageController.insert)

module.exports = router;
const router = require('express').Router();
const CommentController = require('../controllers/CommentController');
const { authentication } = require('../middleware/authentication');

router.get('/', CommentController.getAll)
router.get('/comment', CommentController.getCommentsByPublication)
router.post('/:PublicationId', authentication, CommentController.insert)
module.exports = router;
const router = require('express').Router();
const CommentController = require('../controllers/CommentController');
const { authentication, isAuthor, isCommentAuthor } = require('../middleware/authentication');

router.get('/', CommentController.getAll)
router.get('/comment', CommentController.getCommentsByPublication)
router.post('/:PublicationId', authentication, CommentController.insert)
router.delete('/:_id', authentication, isCommentAuthor, CommentController.delete);
module.exports = router;
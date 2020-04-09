const router = require('express').Router();
const CommentController = require('../controllers/CommentController');
const { authentication } = require('../middleware/authentication');

router.get('/', CommentController.getAll)
router.post('/', CommentController.insert)
module.exports = router;
const router = require('express').Router();
const PublicationController = require('../controllers/PublicationController');
const { authentication } = require('../middleware/authentication');

router.get('/', PublicationController.getAll)
router.post('/', PublicationController.insert)
module.exports = router;
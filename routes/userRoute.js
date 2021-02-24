const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { protect } = require('../middlewares/jwtMethods');

router.get('/me', protect, userController.getMe);
router.get('/become-host', protect, userController.becomeHost);

router.route('/').get(protect, userController.getAllUsers);


module.exports = router;
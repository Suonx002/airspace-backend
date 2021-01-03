const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { protect } = require('../middlewares/jwtMethods');

router.get('/me', protect, userController.getMe);

router.route('/').get(protect, userController.getAllUsers);


module.exports = router;
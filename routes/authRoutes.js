const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const yupValidateReqBody = require('../middlewares/yupValidateReqBody')
const authSchema = require('../validations/auth/authSchema')


router.post('/signup', yupValidateReqBody(authSchema.signupSchema), authController.signup);



module.exports = router;
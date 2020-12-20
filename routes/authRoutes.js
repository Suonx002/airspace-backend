const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const yupValidateReqBody = require('../middlewares/yupValidateReqBody')
const authSchema = require('../validations/authSchema')


router.post('/signup', yupValidateReqBody(authSchema.signupSchema), authController.signup);

router.post('/login', yupValidateReqBody(authSchema.loginSchema), authController.login);



module.exports = router;
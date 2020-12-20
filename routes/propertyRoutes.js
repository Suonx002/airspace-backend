const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');
const yupValidateReqBody = require('../middlewares/yupValidateReqBody');
const propertySchema = require('../validations/propertySchema');
const jwtMethods = require('../middlewares/jwtMethods');


router.route('/').post(jwtMethods.protect, yupValidateReqBody(propertySchema.createPropertySchema), propertyController.createProperty);




module.exports = router;
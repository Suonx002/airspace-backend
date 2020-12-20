const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');
const yupValidateReqBody = require('../middlewares/yupValidateReqBody');
const propertySchema = require('../validations/propertySchema');
const { protect } = require('../middlewares/jwtMethods');


router.route('/')
    .get(protect, propertyController.getAllProperties)
    .post(protect, yupValidateReqBody(propertySchema.createPropertySchema), propertyController.createProperty);

router.route('/:propertyId').get(protect, propertyController.getProperty)


module.exports = router;
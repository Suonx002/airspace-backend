const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');
const yupValidateReqBody = require('../middlewares/yupValidateReqBody');
const propertySchema = require('../validations/propertySchema');
const { protect } = require('../middlewares/jwtMethods');

const propertRatingRouter = require('./propertyRatingRoutes');


// allow propertyRatings go through here
// api/v1/properties/:propertyId/propertyRatings
router.use('/:propertyId/propertyRatings', propertRatingRouter);


router.route('/')
    .get(protect, propertyController.getAllProperties)
    .post(protect, yupValidateReqBody(propertySchema.createPropertySchema), propertyController.createProperty);

router.route('/:propertyId')
    .get(protect, propertyController.getProperty)
    .patch(protect, yupValidateReqBody(propertySchema.updatePropertySchema), propertyController.updateProperty)
    .delete(protect, propertyController.deleteProperty);


module.exports = router;
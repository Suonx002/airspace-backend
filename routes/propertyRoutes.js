const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');
const yupValidateReqBody = require('../middlewares/yupValidateReqBody');
const propertySchema = require('../validations/propertySchema');
const { protect } = require('../middlewares/jwtMethods');

const propertReviewRouter = require('./propertyReviewRoutes');


const multerController = require('../controllers/multerController');



// allow propertyReviews go through here
// api/v1/properties/:propertyId/propertyReviews
router.use('/:propertyId/propertyReviews', propertReviewRouter);


router.get('/homepage', propertyController.homepageProperties);

router.route('/')
    .get(propertyController.getAllProperties)
    .post(protect,
        multerController.single('propertyImage'),
        yupValidateReqBody(propertySchema.createPropertySchema),
        propertyController.createProperty);

router.route('/:propertyId')
    .get(propertyController.getProperty)
    .patch(protect,
        multerController.single('propertyImage'),
        yupValidateReqBody(propertySchema.updatePropertySchema),
        propertyController.updateProperty)
    .delete(protect, propertyController.deleteProperty);


module.exports = router;
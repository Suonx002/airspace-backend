const express = require('express');
const router = express.Router({
    mergeParams: true
});

const propertyRatingController = require('../controllers/propertyRatingController');
const yupValidateReqBody = require('../middlewares/yupValidateReqBody');
const propertyRatingSchema = require('../validations/propertyRatingSchema');
const { protect } = require('../middlewares/jwtMethods');

router.route('/')
    .get(protect, propertyRatingController.getAllPropertyRatings)
    .post(protect, yupValidateReqBody(propertyRatingSchema.createPropertyRatingSchema), propertyRatingController.createPropertyRating);



module.exports = router;
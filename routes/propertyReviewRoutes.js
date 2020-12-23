const express = require('express');
const router = express.Router({
    mergeParams: true
});

const propertyReviewController = require('../controllers/propertyReviewController');
const yupValidateReqBody = require('../middlewares/yupValidateReqBody');
const propertyReviewSchema = require('../validations/propertyReviewSchema');
const { protect } = require('../middlewares/jwtMethods');

router.route('/')
    .get(protect, propertyReviewController.getAllpropertyReviews)
    .post(protect, yupValidateReqBody(propertyReviewSchema.createpropertyReviewSchema), propertyReviewController.createpropertyReview);

router.route('/:propertyReviewId').get(protect, propertyReviewController.getpropertyReview);



module.exports = router;
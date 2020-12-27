const express = require('express');
const router = express.Router({
    mergeParams: true
});

const propertyReviewController = require('../controllers/propertyReviewController');
const yupValidateReqBody = require('../middlewares/yupValidateReqBody');
const propertyReviewSchema = require('../validations/propertyReviewSchema');
const { protect } = require('../middlewares/jwtMethods');

router.route('/')
    .get(protect, propertyReviewController.getAllPropertyReviews)
    .post(protect, yupValidateReqBody(propertyReviewSchema.createPropertyReviewSchema), propertyReviewController.createPropertyReview);

router.route('/:propertyReviewId')
    .get(protect, propertyReviewController.getPropertyReview)
    .patch(protect, yupValidateReqBody(propertyReviewSchema.updatePropertyReviewSchema), propertyReviewController.updatePropertyReview)
    .delete(protect, propertyReviewController.deletePropertyReview);



module.exports = router;
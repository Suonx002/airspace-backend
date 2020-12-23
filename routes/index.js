const express = require('express');
const router = express.Router();

const authRouter = require('./authRoutes');
const userRouter = require('./userRoute');
const propertyRouter = require('./propertyRoutes');
const propertyReviewRouter = require('./propertyReviewRoutes');


router.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Welcome to airspace backend api!'
    });
});


router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/properties', propertyRouter);
router.use('/propertyReviews', propertyReviewRouter);

module.exports = router;
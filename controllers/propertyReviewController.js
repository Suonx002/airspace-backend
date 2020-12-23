const Property = require('../models/Property');
const propertyReview = require("../models/propertyReview");

const AppError = require("../utils/methods/AppError");
const catchAsync = require("../utils/methods/catchAsync");
const currentTimestamp = require("../utils/methods/currentTimestamp");


exports.getAllpropertyReviews = catchAsync(async (req, res, next) => {

    const propertyReviews = await propertyReview.query().withGraphFetched('[user, property.user]')
        .modifyGraph('user', builder => { builder.select("firstName", 'lastName'); })
        .modifyGraph('property.user', builder => { builder.select('firstName', 'lastName'); });

    return res.status(200).json({
        status: 'success',
        data: propertyReviews
    });
});

exports.getpropertyReview = catchAsync(async (req, res, next) => {
    const { propertyId, propertyReviewId } = req.params;

    if (!propertyId || !propertyReviewId) {
        return next(new AppError('Please provide property ID and property review ID', 400));
    }

    const propertyReview = await propertyReview.query().where({ id: propertyReviewId }).andWhere({ propertyId }).first();

    if (!propertyReview) {
        return next(new AppError('There is no property review for this property ID', 400));
    }



    return res.status(200).json({
        status: 'success',
        data: propertyReview
    });


});

exports.createpropertyReview = catchAsync(async (req, res, next) => {
    const { propertyId } = req.params;

    const { title, comment, rating } = req.body;

    if (!propertyId) {
        return next(new AppError('Please provide property id', 400));
    }

    const property = await Property.query().where({ id: propertyId }).first();

    if (!property) {
        return next(new AppError('There is no property with this ID', 400));
    }

    // property owner are not allow to leave a review
    if (req.user.id === property.userId) {
        return next(new AppError('Owner cannot leave review on their own property', 400));
    }

    const propertyReviewExist = await propertyReview.query().where({
        userId: req.user.id,
        propertyId
    }).first();

    console.log({ propertyReviewExist });

    if (propertyReviewExist) {
        return next(new AppError('You are only allow to leave one review per property', 400));
    }

    const propertyReview = await propertyReview.query().insert({
        title,
        comment,
        rating,
        propertyId,
        userId: req.user.id
    });


    return res.status(201).json({
        status: 'success',
        data: propertyReview
    });

});
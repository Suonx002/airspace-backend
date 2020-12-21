const Property = require('../models/Property');
const PropertyRating = require("../models/PropertyRating");

const AppError = require("../utils/methods/AppError");
const catchAsync = require("../utils/methods/catchAsync");
const currentTimestamp = require("../utils/methods/currentTimestamp");


exports.getAllPropertyRatings = catchAsync(async (req, res, next) => {

    const propertyRatings = await PropertyRating.query();

    return res.status(200).json({
        status: 'success',
        data: propertyRatings
    });
});

exports.createPropertyRating = catchAsync(async (req, res, next) => {
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

    const propertyRatingExist = await PropertyRating.query().where({
        userId: req.user.id,
        propertyId
    }).first();

    console.log({ propertyRatingExist });

    if (propertyRatingExist) {
        return next(new AppError('You are only allow to leave one review per property', 400));
    }

    const propertyRating = await PropertyRating.query().insert({
        title,
        comment,
        rating,
        propertyId,
        userId: req.user.id
    });


    return res.status(201).json({
        status: 'success',
        data: propertyRating
    });

});
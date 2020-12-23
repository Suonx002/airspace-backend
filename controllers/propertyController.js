const slugify = require("slugify");
const Property = require("../models/Property");

const AppError = require("../utils/methods/AppError");
const catchAsync = require("../utils/methods/catchAsync");
const currentTimestamp = require("../utils/methods/currentTimestamp");

exports.createProperty = catchAsync(async (req, res, next) => {
    const {
        title,
        description,
        address,
        state,
        city,
        bedrooms,
        bathrooms,
        guests,
        zipcode,
        price,
    } = req.body;

    const propertyExist = await Property.query().where({ title }).first();

    if (propertyExist) {
        return next(
            new AppError("Title is taken, please use something else!", 400)
        );
    }

    const property = await Property.query().insert({
        slug: slugify(title),
        title,
        description,
        address,
        state,
        city,
        bedrooms,
        bathrooms,
        guests,
        zipcode,
        price,
        userId: req.user.id,
    });

    return res.status(201).json({
        status: "success",
        message: "Successfully created new property!",
        data: property,
    });
});

exports.getAllProperties = catchAsync(async (req, res, next) => {
    const properties = await Property.query().withGraphFetched('[propertyReviews.user, user]')
        .modifyGraph('user', builder => { builder.select('firstName', 'lastName', 'username', 'email'); })
        .modifyGraph('propertyReviews', builder => { builder.select('title', 'comment', 'rating'); })
        .modifyGraph('propertyReviews.user', builder => { builder.select('firstName', 'lastName'); });

    return res.status(200).json({
        status: "success",
        length: properties.length,
        data: properties,
    });
});

exports.getProperty = catchAsync(async (req, res, next) => {
    const { propertyId } = req.params;

    const property = await Property.query().where({ id: propertyId }).first();

    if (!property) {
        return next(new AppError("There is no property with this ID", 400));
    }

    return res.status(200).json({
        status: "success",
        data: property,
    });
});

exports.updateProperty = catchAsync(async (req, res, next) => {
    const {
        title,
        description,
        address,
        city,
        state,
        zipcode,
        bedrooms,
        bathrooms,
        guests,
        price,
    } = req.body;

    const { propertyId } = req.params;

    const property = await Property.query().where({ id: propertyId }).first();

    if (!property) {
        return next(new AppError("There is no property with this ID", 400));
    }

    if (req.user.id !== property.userId) {
        return next(
            new AppError("You do not have permission to update this property", 401)
        );
    }


    const updatedProperty = await Property.query().where({ id: propertyId }).update({
        title,
        description,
        address,
        city,
        state,
        zipcode,
        bedrooms,
        bathrooms,
        guests,
        price,
        slug: slugify(title),
        updatedAt: currentTimestamp(),
    }).returning('*');

    return res.status(200).json({
        status: "success",
        message: 'Successfully updated property details!',
        data: updatedProperty[0]
    });
});


exports.deleteProperty = catchAsync(async (req, res, next) => {
    const { propertyId } = req.params;

    const property = await Property.query().where({ id: propertyId }).first();

    if (!property) {
        return next(new AppError('There is no property with this ID', 400));
    }

    if (req.user.id !== property.userId) {
        return next(
            new AppError("You do not have permission to delete this property", 401)
        );
    }

    await Property.query().where({ id: propertyId }).del();

    return res.status(200).json({
        status: 'success',
        message: `Successfully deleted ${property.title}!`
    });
});
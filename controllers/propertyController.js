const slugify = require('slugify');
const Property = require('../models/Property')

const AppError = require('../utils/methods/AppError');
const catchAsync = require('../utils/methods/catchAsync');



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
        price
    } = req.body;


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
        userId: req.user.id
    })

    return res.status(201).json({
        status: "success",
        message: 'Successfully created new property!',
        data: property
    })
})

exports.getAllProperties = catchAsync(async (req, res, next) => {

    const properties = await Property.query();

    return res.status(200).json({
        status: 'success',
        data: properties
    })

})

exports.getProperty = catchAsync(async (req, res, next) => {
    const { propertyId } = req.params;

    const property = await Property.query().where({ id: propertyId }).first();

    if (!property) {
        return next(new AppError('There is no property with this ID', 400));
    }

    return res.status(200).json({
        status: 'success',
        data: property
    })
})
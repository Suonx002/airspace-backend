const slugify = require('slugify');
const Property = require('../models/Property')

const AppError = require('../utils/methods/AppError');
const catchAsync = require('../utils/methods/catchAsync');



exports.createProperty = catchAsync(async (req, res, next) => {

    console.log({
        user: req.user
    })


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
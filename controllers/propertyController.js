const slugify = require("slugify");

const Property = require("../models/Property");
const cloudinaryController = require('../controllers/cloudinaryController');

const lowerString = require('../utils/methods/lowercaseString');
const AppError = require("../utils/methods/AppError");
const catchAsync = require("../utils/methods/catchAsync");
const currentTimestamp = require("../utils/methods/currentTimestamp");
const getPublicId = require('../utils/methods/getPublicId');

// exports.recentProperties = catchAsync(async (req, res, next) => {
//     const properties = await Property.query().withGraphFetched('[propertyReviews.user, user]')
//         .modifyGraph('user', builder => { builder.select('firstName', 'lastName', 'username', 'email'); })
//         .modifyGraph('propertyReviews', builder => { builder.select('title', 'comment', 'rating'); })
//         .modifyGraph('propertyReviews.user', builder => { builder.select('firstName', 'lastName'); }).orderBy('createdAt', 'asc').orderBy('title', 'asc').limit(6);

//     return res.status(200).json({
//         status: "success",
//         length: properties.length,
//         data: properties,
//     });
// });


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


exports.createProperty = catchAsync(async (req, res, next) => {
    let {
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

    title = lowerString(title);
    description = lowerString(description);
    address = lowerString(address);
    state = lowerString(state);
    city = lowerString(city);

    if (!req.file) {
        return next(new AppError('Please upload an image'));
    }

    const propertyExist = await Property.query().where({ title }).first();

    if (propertyExist) {
        return next(
            new AppError("Title is taken, please use something else!", 400)
        );
    }


    const propertyImageResult = await cloudinaryController.upload(req.file.path, 'airspace/properties');

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
        propertyImage: propertyImageResult.url,
        userId: req.user.id,
    });

    return res.status(201).json({
        status: "success",
        message: "Successfully created new property!",
        data: property,

    });
});

exports.updateProperty = catchAsync(async (req, res, next) => {
    let {
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

    title = lowerString(title);
    description = lowerString(description);
    address = lowerString(address);
    state = lowerString(state);
    city = lowerString(city);

    let updatedPhoto;

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

    if (req.file) {
        const propertyImageResult = await cloudinaryController.upload(req.file.path, 'airspace/properties');
        updatedPhoto = propertyImageResult;

        // deleting existing property image from cloudinary (takes publicId) ->
        // ex: http://res.cloudinary.com/airspacerental/image/upload/v1609566938/airspace/properties/r1at7buwd63foxvxgpez.png -> /airspace/properties/r1at7buwd63foxvxgpez

        const publicId = getPublicId(property.propertyImage);
        await cloudinaryController.deleteImage(publicId);
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
        propertyImage: updatedPhoto && updatedPhoto.url,
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

    // delete existing propertyImage from property
    const publicId = getPublicId(property.propertyImage);
    await cloudinaryController.deleteImage(publicId);

    return res.status(200).json({
        status: 'success',
        message: `Successfully deleted ${property.title}!`
    });
});
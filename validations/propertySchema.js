const yup = require('yup');

exports.createPropertySchema = yup.object().shape({
    title: yup.string().min(3).required(),
    description: yup.string().min(5).required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    bedrooms: yup.number().min(1).max(20).required(),
    bathrooms: yup.number().min(1).max(20).required(),
    guests: yup.number().min(1).max(100).required(),
    zipcode: yup.string().length(5).required(),
    price: yup.string().matches(/^\d{0,8}(\.\d{1,2})?$/, 'price must be valid format').required(),
});


exports.updatePropertySchema = yup.object().shape({
    title: yup.string().min(3).required(),
    description: yup.string().min(5).required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    bedrooms: yup.number().min(1).max(20).required(),
    bathrooms: yup.number().min(1).max(20).required(),
    guests: yup.number().min(1).max(100).required(),
    zipcode: yup.string().length(5).required(),
    price: yup.string().matches(/^\d{0,8}(\.\d{1,2})?$/, 'price must be valid format').required(),
});

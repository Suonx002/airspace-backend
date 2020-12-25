const yup = require('yup');

exports.createpropertyReviewSchema = yup.object().shape({
    title: yup.string().trim().min(3).required(),
    comment: yup.string().trim().min(5).required(),
    rating: yup.number().oneOf([1, 2, 3, 4, 5]).required()
});

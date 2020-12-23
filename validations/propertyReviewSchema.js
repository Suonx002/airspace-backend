const yup = require('yup');

exports.createpropertyReviewSchema = yup.object().shape({
    title: yup.string().min(3).required(),
    comment: yup.string().min(5).required(),
    rating: yup.number().oneOf([1, 2, 3, 4, 5]).required()
});

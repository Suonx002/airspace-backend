const catchAsync = require('../utils/methods/catchAsync');


module.exports = schema => catchAsync(async (req, res, next) => {
    const validateBody = await schema.validate(req.body, { abortEarly: false });
    // yup create new object whenever there is a default value
    req.body = validateBody;

    next();
});
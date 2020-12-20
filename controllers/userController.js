
const User = require('../models/User')

// const jwtMethods = require('../middlewares/jwtMethods');
// const bcryptMethods = require('../utils/methods/bcryptMethods');
// const AppError = require('../utils/methods/AppError');
const catchAsync = require('../utils/methods/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.query();
    return res.status(200).json({
        status: "success",
        length: users.length,
        data: users
    })
})

const User = require('../models/User');
const AppError = require('../utils/methods/AppError');

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
    });
});

exports.getMe = catchAsync(async (req, res, next) => {

    const user = await User.query().where({ id: req.user.id }).first();

    if (!user) {
        return next(new AppError('This user does not exist', 400));
    }

    // remove sensitive infos from user object 
    const { password, createdAt, updatedAt, ...newUser } = user;


    return res.status(200).json({
        status: 'success',
        data: newUser
    });

});
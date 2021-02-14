const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/methods/catchAsync');
const AppError = require('../utils/methods/AppError');

const User = require('../models/User');



exports.signToken = username => {
    const payload = { username };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });

    return token;
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    // check if user provide bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        console.log({
            header: req.headers.authorization
        });
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in to access this. Please log in to get access!'));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);


    // check if user exist
    const userExisted = await User.query().where('username', decoded.username).first().select('id', 'username', 'email', 'firstName', 'lastName', 'role', 'profileImage');

    if (!userExisted) {
        return next(new AppError('User is no longer exist, please create a new one', 404));
    }

    req.user = userExisted;

    next();

});
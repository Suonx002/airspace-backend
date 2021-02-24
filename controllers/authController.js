const { v4: uuidv4 } = require('uuid');

const User = require('../models/User');

const lowercaseString = require('../utils/methods/lowercaseString');
const jwtMethods = require('../middlewares/jwtMethods');
const bcryptMethods = require('../utils/methods/bcryptMethods');
const AppError = require('../utils/methods/AppError');
const catchAsync = require('../utils/methods/catchAsync');


exports.signup = catchAsync(async (req, res, next) => {

    let { username, email, firstName, lastName, password } = req.body;

    // lowercase 
    username = lowercaseString(username);
    email = lowercaseString(email);
    firstName = lowercaseString(firstName);
    lastName = lowercaseString(lastName);

    const id = uuidv4();

    const userExisted = await User.query().where({ username }).orWhere({ email }).first();

    if (userExisted) {
        return next(new AppError('Username or email already existed, please use a different one', 400));
    }

    //hash password
    const hashedPassword = await bcryptMethods.hashPassword(password);

    const newUser = await User.query().insert({
        id,
        username,
        email,
        firstName,
        lastName,
        password: hashedPassword
    });


    // remove password from output
    const { password: currentPassword, createdAt, updatedAt, ...rest } = newUser;


    // sign token 
    const token = jwtMethods.signToken(username);


    return res.status(201).json({
        status: 'success',
        token,
        data: { ...rest, role: 'user' }
    });
});

exports.login = catchAsync(async (req, res, next) => {

    let { email, password } = req.body;

    // lowercase 
    email = lowercaseString(email);

    const user = await User.query().where({ email }).first();

    if (!user) {
        return next(new AppError('There is no account with this email', 400));
    }

    const confirmPassword = await bcryptMethods.verifyPassword(password, user.password);

    // check if password match
    if (!confirmPassword) {
        return next(new AppError('Email or password is invalid', 400));
    }




    // hide password and other sentitive fields
    const { password: currentPassword, createdAt, updatedAt, ...rest } = user;





    // sign token 
    const token = jwtMethods.signToken(user.username);

    return res.status(200).json({
        status: 'success',
        token,
        data: rest,
    });

});
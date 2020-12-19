const User = require('../models/User')

const jwtMethods = require('../middlewares/jwtMethods');
const bcryptMethods = require('../utils/methods/bcryptMethods');
const AppError = require('../utils/methods/AppError');
const catchAsync = require('../utils/methods/catchAsync');


exports.signup = catchAsync(async (req, res, next) => {

    const { username, email, firstName, lastName, password } = req.body;

    const userExisted = await User.query().where({ username }).orWhere({ email }).first();

    if (userExisted) {
        return next(new AppError('Username or email already existed, please use a different one', 400));
    }

    //hash password
    const hashedPassword = await bcryptMethods.hashPassword(password);

    const newUser = await User.query().insert({
        username,
        email,
        firstName,
        lastName,
        password: hashedPassword
    });


    // remove password from output
    newUser.password = undefined;

    // sign token 
    const token = jwtMethods.signToken(username);


    return res.status(201).json({
        status: 'success',
        token,
        data: newUser
    })
});

exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;



    const user = await User.query().where({ email }).first();

    if (!user) {
        return next(new AppError('There is no account with this email', 400));
    }

    const confirmPassword = await bcryptMethods.verifyPassword(password, user.password);
    console.log({
        confirmPassword,
        userPassword: user.password
    })

    // check if password match
    if (!confirmPassword) {
        return next(new AppError('Email or password is invalid', 400));
    }

    // hide password
    user.password = undefined;

    return res.status(200).json({
        status: 'success',
        data: user,
        allUsers: await User.query()
    })

})
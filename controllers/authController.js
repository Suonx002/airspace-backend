const User = require('../models/User')

const authValidator = require('../validations/auth/authSchema')
const jwtMethods = require('../middlewares/jwtMethods');
const bcryptMethods = require('../utils/methods/bcryptMethods');
const AppError = require('../utils/methods/AppError');
const catchAsync = require('../utils/methods/catchAsync');


exports.signup = catchAsync(async (req, res, next) => {
    const { username, email, firstName, lastName, password } = req.body;


    await authValidator.signupSchema.validate({ username, email, firstName, lastName, password });



    const userExisted = await User.query().where({ username }).orWhere({ email }).first();



    console.log({ userExisted })

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

    console.log({ newUser });

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
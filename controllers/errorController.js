const AppError = require("../utils/methods/AppError");



const handleUniqueViolation = err => {

    const columnsReducer = err.columns.reduce((prev, current) => {
        return `${prev} ${current}`;
    }, '');
    err.message = `${columnsReducer.trim()} is taken, please use something else.`;
    err.statusCode = 400;
    return err;
};

const handleJWTExpire = err => {
    err.message = 'Your token has expired. Please login again.';
    err.status = 400;

    return err;
};

const globalErrorHandlers = (err, req, res, next) => {

    let error = { ...err };

    // err.message is a property, would need to set inside of error,,
    error.message = err.message;

    console.log({
        error
    });


    // console.log(error.name === 'TokenExpiredError') ;

    if (error.name === 'UniqueViolationError') error = handleUniqueViolation(error);
    if (error.name === 'TokenExpiredError') error = handleJWTExpire(error);

    return res.status(error.statusCode || 500).json({
        status: 'fail',
        message: error.message || 'Server Error',
        errors: error.inner ? error.inner : undefined,
    });
};


module.exports = globalErrorHandlers;
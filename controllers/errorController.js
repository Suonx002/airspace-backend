const AppError = require("../utils/methods/AppError");

const globalErrorHandlers = (err, req, res, next) => {

    const error = { ...err };

    return res.status(error.statusCode || 500).json({
        status: 'fail',
        message: error.message || 'Server Error'
    })
}


module.exports = globalErrorHandlers;
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const dotenv = require('dotenv').config({ path: path.resolve(__dirname + '/configs.env') })

// import database connection
require('./database/connectDB');



const app = express();



const AppError = require('./utils/methods/AppError')
const globalErrorHandlers = require('./controllers/errorController')
const apiRouter = require('./routes');



// middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
}

app.use(compression());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// handle all routers in ./routes/index.js
app.use('/api/v1', apiRouter);


// catch errors (all verbs: get post put patch , etc...)
app.all('*', (req, res, next) => {
    return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
})

app.use(globalErrorHandlers);






module.exports = app;
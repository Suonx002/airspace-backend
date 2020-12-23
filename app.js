const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const dotenv = require('dotenv').config({ path: path.resolve(__dirname + '/configs.env') });

const app = express();
const db = require('./database/connectDB');


const AppError = require('./utils/methods/AppError');
const globalErrorHandlers = require('./controllers/errorController');
const apiRouter = require('./routes');
const trimAllRequests = require('./utils/methods/trimAllRequests');


// middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(compression());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(trimAllRequests);

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Welcome to Airspace Rental homepage!'
    });
});

// handle all routers in ./routes/index.js
app.use('/api/v1', apiRouter);

// catch errors (all verbs: get post put patch , etc...)
app.all('*', (req, res, next) => {
    return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorHandlers);

module.exports = app;
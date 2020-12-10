const path = require('path');
const express = require('express');
const Knex = require('knex');
const { Model } = require('objection')
const knexfile = require('./knexfile');

const dotenv = require('dotenv').config({ path: path.resolve(__dirname + '/configs.env') })

const app = express();

// connect model with knex
Model.knex(knexfile[process.env.NODE_ENV]);


const authRouter = require('./routes/authRoutes');



// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/auth', authRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is currently running on port ${PORT}`))
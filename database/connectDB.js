const Knex = require('knex');
const { Model } = require('objection')
const knexfile = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';

// connect model with knex
const connection = Knex(knexfile[environment])
Model.knex(connection);


module.exports = connection;
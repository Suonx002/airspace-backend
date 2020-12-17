const knex = require('knex');
const { Model } = require('objection')
const knexfile = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';

const connectionConfig = knexfile[environment]

console.log({ connectionConfig })

// connect model with knex
const connection = knex(connectionConfig)


Model.knex(connection);


module.exports = connection;
const knex = require('knex');
const { Model } = require('objection');
const knexfile = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';

const connectionConfig = knexfile[environment];


// connect model with knex
// or statement is for jest picking up
const connection = knex(connectionConfig || knexfile['development']);


Model.knex(connection);



module.exports = connection;
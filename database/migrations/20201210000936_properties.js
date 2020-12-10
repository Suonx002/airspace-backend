const Knex = require('knex');
const tableNames = require('../../constants/tableNames')


/**
 * 
 * @param {Knex} knex 
 */


exports.up = async knex => knex.schema.createTable(tableNames.properties, table => {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('address').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.integer('zipcode').notNullable();
    table.integer('bedrooms').notNullable();
    table.integer('bathrooms').notNullable();
    table.integer('guests').notNullable();
    table.integer('price').notNullable();
    table.jsonb('photos');
    table.jsonb('ratings');
})

exports.down = async knex => knex.schema.dropTable(tableNames.properties);
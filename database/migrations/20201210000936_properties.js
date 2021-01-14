const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const defaultTableColumns = require('../../utils/methods/defaultTableColumns');



/**
 * 
 * @param {Knex} knex 
 */


exports.up = async knex => await knex.schema.createTable(tableNames.properties, table => {

    table.increments();
    table.string('slug').notNullable();
    table.string('title').unique().notNullable();
    table.string('description').notNullable();
    table.string('address').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('zipcode').notNullable();
    table.integer('bedrooms').notNullable();
    table.integer('bathrooms').notNullable();
    table.integer('guests').notNullable();
    table.float('price').notNullable();


    table.uuid('userId').unsigned().notNullable();
    table.foreign('userId').references('id').inTable('users').onUpdate('cascade').onDelete('cascade');
    defaultTableColumns(table, knex);

});

exports.down = async knex => await knex.schema.dropTableIfExists(tableNames.properties);
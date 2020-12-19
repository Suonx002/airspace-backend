const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const tableDefaultColumns = require('../../utils/methods/defaultTableColumns')

/**
 * 
 * @param {Knex} knex 
 */

exports.up = async knex => await knex.schema.createTable(tableNames.propertyRatings, table => {
    table.increments();
    table.string('title').notNullable();
    table.enu('rating', [1, 2, 3, 4, 5]).notNullable();
    table.text('comment').notNullable();
    tableDefaultColumns(table, knex);

    table.integer('propertyId').unsigned().notNullable();
    table.foreign('propertyId').references("id").inTable('properties');
})

exports.down = async knex => await knex.schema.dropTable(tableNames.propertyRatings);
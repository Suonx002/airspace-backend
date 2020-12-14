const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const tableDefaultColumns = require('../../utils/methods/defaultTableColumns')

/**
 * 
 * @param {Knex} knex 
 */

exports.up = async knex => await knex.schema.createTable(tableNames.propertyNotAllowServices, table => {
    table.increments();
    table.string('title').notNullable();
    defaultTableColumns(table, knex);
    table.integer('propertyId').unsigned().notNullable();
    table.foreign('propertyId').references("id").inTable('properties');
})

exports.down = async knex => await knex.schema.dropTable(tableNames.propertyNotAllowServices);

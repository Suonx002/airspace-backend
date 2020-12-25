const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const tableDefaultColumns = require('../../utils/methods/defaultTableColumns');

/**
 * 
 * @param {Knex} knex 
 */

exports.up = async knex => await knex.schema.createTable(tableNames.propertyAvailabilities, table => {
    table.increments();
    table.timestamp('startDate').notNullable();
    table.timestamp('endDate').notNullable();
    tableDefaultColumns(table, knex);

    table.integer('propertyId').unsigned().notNullable();
    table.foreign('propertyId').references("id").inTable('properties');
    table.uuid('userId').notNullable();
    table.foreign('userId').references('id').inTable('users');
});

exports.down = async knex => await knex.schema.dropTableIfExists(tableNames.propertyAvailabilities);

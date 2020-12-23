const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const tableDefaultColumns = require('../../utils/methods/defaultTableColumns');

/**
 * 
 * @param {Knex} knex 
 */

exports.up = async knex => await knex.schema.createTable(tableNames.propertyRules, table => {
    table.increments();
    table.string('checkin').notNullable();
    table.string('checkout').notNullable();
    table.boolean('isSmoking').notNullable();
    table.integer('minAge').notNullable();
    table.text('refundPolicy').notNullable();
    table.text('otherNotes').notNullable();
    table.string('userId').notNullable();
    tableDefaultColumns(table, knex);
    table.integer('propertyId').unsigned().notNullable();
    table.foreign('propertyId').references("id").inTable('properties');
});

exports.down = async knex => await knex.schema.dropTableIfExists(tableNames.propertyRules);

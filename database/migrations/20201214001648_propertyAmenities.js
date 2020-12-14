const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const tableDefaultColumns = require('../../utils/methods/defaultTableColumns')

/**
 * 
 * @param {Knex} knex 
 */


exports.up = async knex => await knex.schema.createTable(tableNames.propertyAmenities, table => {
    table.increments();
    table.string('title').notNullable();
    table.integer('propertyId').unsigned().notNullable();
    table.foreign('propertyId').references('id').inTable('properties').onUpdate('cascade').onDelete('cascade')
    tableDefaultColumns(table, knex);

})

exports.down = async knex => await knex.schema.dropTable(tableNames.propertyAmenities);

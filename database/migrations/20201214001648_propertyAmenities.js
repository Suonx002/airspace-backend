const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const tableDefaultColumns = require('../../utils/methods/defaultTableColumns')

/**
 * 
 * @param {Knex} knex 
 */


exports.up = async knex => knex.schema.createTable(tableNames.propertyAmenities, table => {
    table.increments();
    table.string('title').notNullable();
    table.integer('propertyId').unsigned().notNullable();
    table.foreign('propertyId').references('id').inTable('properties').onUpdate('cascade').onDelete('cascade')

    tableDefaultColumns(table);
})

exports.down = async knex => knex.schema.dropTable(tableNames.properties);

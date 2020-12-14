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
    tableDefaultColumns();
    table.foreign('propertyId').references('properties.id').onUpdate('CASCADE')
        .onDelete('CASCADE')
})

exports.down = async knex => knex.schema.dropTable(tableNames.properties);

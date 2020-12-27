const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const tableDefaultColumns = require('../../utils/methods/defaultTableColumns');

/**
 * 
 * @param {Knex} knex 
 */

exports.up = async knex => await knex.schema.createTable(tableNames.propertyPhotos, table => {
    table.increments();
    table.string('title').notNullable();
    table.string('imageUrl').notNullable();
    tableDefaultColumns(table, knex);

    table.integer('propertyId').unsigned().notNullable();
    table.foreign('propertyId').references('id').inTable('properties').onUpdate('cascade').onDelete('cascade');
    table.uuid('userId').notNullable();
    table.foreign('userId').references('id').inTable('users').onUpdate('cascade').onDelete('cascade');

});

exports.down = async knex => await knex.schema.dropTableIfExists(tableNames.propertyPhotos);

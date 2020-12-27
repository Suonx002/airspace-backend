const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const tableDefaultColumns = require('../../utils/methods/defaultTableColumns');

/**
 * 
 * @param {Knex} knex 
 */

exports.up = async knex => await knex.schema.createTable(tableNames.propertyReviews, table => {
    table.increments();
    table.string('title').notNullable();
    table.enu('rating', [1, 2, 3, 4, 5]).notNullable();
    table.text('comment').notNullable();
    tableDefaultColumns(table, knex);

    table.integer('propertyId').unsigned().notNullable();
    table.foreign('propertyId').references('id').inTable('properties').onUpdate('cascade').onDelete('cascade');
    table.uuid('userId').notNullable();
    table.foreign('userId').references('id').inTable('users').onUpdate('cascade').onDelete('cascade');

});

exports.down = async knex => await knex.schema.dropTableIfExists(tableNames.propertyReviews);

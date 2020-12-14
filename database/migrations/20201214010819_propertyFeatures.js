const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const tableDefaultColumns = require('../../utils/methods/defaultTableColumns')

/**
 * 
 * @param {Knex} knex 
 */

exports.up = async knex => await knex.schema.createTable(tableNames.propertyFeatures, table => {
    table.increments();
})

exports.down = async knex => await knex.schema.dropTable(tableNames.propertyFeatures);

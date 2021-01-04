
const Knex = require('knex');
const tableNames = require('../../utils/constants/tableNames');
const defaultTableColumns = require('../../utils/methods/defaultTableColumns');

/**
 * 
 * @param {Knex} knex 
 */


exports.up = async knex => await knex.schema.table(tableNames.properties, table => {

    table.string('propertyImage').notNullable().defaultTo('https://res.cloudinary.com/airspacerental/image/upload/v1609567013/airspace/properties/property_default.png');
});

exports.down = async knex => await knex.schema.table(tableNames.properties, table => {

    table.dropColumn('propertyImage');
});


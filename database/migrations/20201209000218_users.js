const Knex = require('knex');

const tableNames = require('../../utils/constants/tableNames');
const defaultTableColumns = require('../../utils/methods/defaultTableColumns');

/**
 * 
 * @param {Knex} knex 
 */

// up is migration 
exports.up = async knex => await knex.schema.createTable(tableNames.users, table => {


    table.uuid('id').unique().primary();
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('password').notNullable();
    table.string('profileImage').notNullable().defaultTo('https://res.cloudinary.com/airspacerental/image/upload/v1610692325/airspace/users/person-default_uikdlb.png');
    table.enum('role', ['user', 'host', 'admin', 'super admin']).defaultTo('user');
    defaultTableColumns(table, knex);
});

//down is rollback
exports.down = async knex => await knex.schema.dropTableIfExists(tableNames.users);

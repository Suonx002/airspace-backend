const Knex = require('knex');
const { v4: uuidv4 } = require('uuid')

const tableNames = require('../../utils/constants/tableNames')
const defaultTableColumns = require('../../utils/methods/defaultTableColumns')

/**
 * 
 * @param {Knex} knex 
 */

// up is migration 
exports.up = async knex => await knex.schema.createTable(tableNames.users, table => {


    table.uuid('id').unique().primary().defaultTo(uuidv4());
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('password').notNullable();
    table.enum('role', ['user', 'host', 'admin', 'super admin']).defaultTo('user');
    defaultTableColumns(table, knex);
})

//down is rollback
exports.down = async knex => await knex.schema.dropTable(tableNames.users);

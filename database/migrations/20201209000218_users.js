const Knex = require('knex');
const tableNames = require('../../constants/tableNames')

/**
 * 
 * @param {Knex} knex 
 */

// up is migration 
exports.up = knex => knex.schema.createTable(tableNames.users, table => {

    table.increments();
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('password').notNullable();
})

//down is rollback
exports.down = knex => knex.schema.dropTable(tableNames.users);

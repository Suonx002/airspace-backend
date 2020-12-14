const { tableName } = require("../../models/UserModel");

const tableDefaultColumns = (table, knex) => {

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestampe('updatedAt').defaultTo(knex.fn.now());

}

module.exports = tableDefaultColumns;
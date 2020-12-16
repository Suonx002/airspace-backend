const { tableName } = require("../../models/User");

const tableDefaultColumns = (table, knex) => {

    const currentDate = new Date().toISOString();

    table.timestamp('createdAt').defaultTo(currentDate);
    table.timestamp('updatedAt').defaultTo(currentDate);

}

module.exports = tableDefaultColumns;
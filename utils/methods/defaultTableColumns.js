const { tableName } = require("../../models/UserModel");

const tableDefaultColumns = (table) => {

    table.string('createdAt');
    table.string('updatedAt');

}

module.exports = tableDefaultColumns;
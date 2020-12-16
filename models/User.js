const BaseModel = require('./Base');

const tableNames = require('../utils/constants/tableNames')


class User extends BaseModel {

    static get tableName() {
        return tableNames.users;
    }
}


module.exports = User;
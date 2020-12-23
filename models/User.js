const BaseModel = require('./Base');

const tableNames = require('../utils/constants/tableNames');


class User extends BaseModel {

    static get tableName() {
        return tableNames.users;
    }

    static get relationMappings() {

        const Property = require('./Property');

        return {
            properties: {
                relation: BaseModel.HasManyRelation,
                modelClass: Property,
                join: {
                    from: `${tableNames.users}.id`,
                    to: `${tableNames.properties}.userId`
                }
            }
        };
    };
}


module.exports = User;
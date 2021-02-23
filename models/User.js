
const BaseModel = require('./Base');
const Property = require('./Property');
const PropertyReview = require('./PropertyReview');

const tableNames = require('../utils/constants/tableNames');


class User extends BaseModel {

    static get tableName() {
        return tableNames.users;
    }

    static get relationMappings() {



        return {
            properties: {
                relation: BaseModel.HasManyRelation,
                modelClass: Property,
                join: {
                    from: `${tableNames.users}.id`,
                    to: `${tableNames.properties}.userId`
                }
            },
            propertyReviews: {
                relation: BaseModel.HasManyRelation,
                modelClass: PropertyReview,
                join: {
                    from: `${tableNames.users}.id`,
                    to: `${tableNames.propertyReviews}.userId`
                }
            }
        };
    };
}


module.exports = User;
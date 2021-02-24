
const BaseModel = require('./Base');

const tableNames = require('../utils/constants/tableNames');


class User extends BaseModel {

    static get tableName() {
        return tableNames.users;
    }

    static get relationMappings() {
        const Property = require('./Property');
        const PropertyReview = require('./PropertyReview');



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
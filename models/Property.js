const BaseModel = require('./Base');


const tableNames = require('../utils/constants/tableNames');

class Property extends BaseModel {

    static get tableName() {
        return tableNames.properties;
    }

    static get relationMappings() {
        const propertyReview = require('./PropertyReview');
        const User = require('./User');

        return {
            user: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.properties}.userId`,
                    to: `${tableNames.users}.id`
                }
            },
            propertyReviews: {
                relation: BaseModel.HasManyRelation,
                modelClass: propertyReview,
                join: {
                    from: `${tableNames.properties}.id`,
                    to: `${tableNames.propertyReviews}.propertyId`
                }
            },


        };
    }

}


module.exports = Property;
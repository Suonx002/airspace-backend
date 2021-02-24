const BaseModel = require('./Base');

const tableNames = require('../utils/constants/tableNames');

class PropertyReview extends BaseModel {


    static get tableName() {
        return tableNames.propertyReviews;
    }

    static get relationMappings() {
        const Property = require('./Property');
        const User = require('./User');


        return {
            property: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Property,
                join: {
                    from: `${tableNames.propertyReviews}.propertyId`,
                    to: `${tableNames.properties}.id`
                }
            },
            user: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.propertyReviews}.userId`,
                    to: `${tableNames.users}.id`
                }
            }
        };
    }
}


module.exports = PropertyReview;
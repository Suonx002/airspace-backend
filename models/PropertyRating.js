const BaseModel = require('./Base');

const tableNames = require('../utils/constants/tableNames');

class PropertyRating extends BaseModel {


    static get tableName() {
        return tableNames.propertyRatings;
    }

    static get relationMappings() {
        const Property = require('./Property');
        const User = require('./User');
        return {
            property: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: Property,
                join: {
                    from: `${tableNames.propertyRatings}.propertyId`,
                    to: `${tableNames.properties}.id`
                }
            },
            user: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${tableNames.propertyRatings}.userId`,
                    to: `${tableNames.users}.id`
                }
            }
        };
    }
}


module.exports = PropertyRating;
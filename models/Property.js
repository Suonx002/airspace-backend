const BaseModel = require('./Base');

const tableNames = require('../utils/constants/tableNames');

class Property extends BaseModel {

    static get tableName() {
        return tableNames.properties;
    }

    static get relationMappings() {
        const PropertyRating = require('./PropertyRating');
        return {
            propertyRatings: {
                relation: BaseModel.HasManyRelation,
                modelClass: PropertyRating,
                join: {
                    from: `${tableNames.properties}.id`,
                    to: `${tableNames.propertyRatings}.propertyId`
                }
            }
        };
    }

}


module.exports = Property;
const BaseModel = require('./Base');

const tableNames = require('../utils/constants/tableNames');

class PropertyRating extends BaseModel {
    static get tableName() {
        return tableNames.propertyRatings;
    }
}


module.exports = PropertyRating;
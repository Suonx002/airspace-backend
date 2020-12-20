const BaseModel = require('./Base');

const tableNames = require('../utils/constants/tableNames')

class Property extends BaseModel {

    static get tableName() {
        return tableNames.properties;
    }

    // static get relationMappings(){
    //     const User = require('./User');
    //     return {
    //         users: {
    //             relation: BaseModel.HasOneRelation,
    //             modelClass: User,
    //             join: {
    //                 from:`${tableNames.properties}.id`,
    //             }
    //         }
    //     }
    // }

}


module.exports = Property;
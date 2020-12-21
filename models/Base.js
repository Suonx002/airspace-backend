const { Model } = require('objection');
const currentTimestamp = require('../utils/methods/currentTimestamp')

class BaseModel extends Model {


    $beforeInsert() {

        this.createdAt = currentTimestamp();
        this.updatedAt = currentTimestamp();
    }

    $beforeUpdate() {
        this.updatedAt = currentTimestamp();
    }



}


module.exports = BaseModel;
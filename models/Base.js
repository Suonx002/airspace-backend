const { Model } = require('objection');

class BaseModel extends Model {


    $beforeInsert() {
        const currentDate = new Date().toISOString();

        this.createdAt = currentDate;
        this.updatedAt = currentDate;
    }

    $beforeUpdate() {
        const currentDate = new Date().toISOString();
        this.updatedAt = currentDate;
    }



}


module.exports = BaseModel;
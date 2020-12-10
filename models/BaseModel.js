const { Model } = require('objection');

class BaseModel extends Model {


    $beforeInsert() {
        const now = new Date().toISOString();

        this.createdAt = now;
        this.updatedAt = now;
    }

    $beforeUpdate() {
        const now = new Date().toISOString();
        this.updatedAt = now;
    }



}


module.exports = BaseModel;